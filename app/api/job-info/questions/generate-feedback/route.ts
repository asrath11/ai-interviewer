import { google } from '@/services/ai/models/google';
import { streamText, generateText } from 'ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const model = google('gemini-2.5-flash-lite'); // ⚡ Fast, cost-efficient Gemini model

const RequestSchema = z.object({
  jobInfoId: z.string().min(1, 'Job info ID is required'),
  questionText: z.string().min(1, 'Question text is required'),
  answer: z.string().min(10, 'Answer text is required for feedback'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validation = RequestSchema.safeParse(body);

    if (!validation.success) {
      console.error(
        'Validation failed:',
        JSON.stringify(validation.error.format(), null, 2)
      );
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { jobInfoId, questionText, answer } = validation.data;

    const jobInfo = await prisma.jobInfo.findUnique({
      where: { id: jobInfoId },
    });

    if (!jobInfo) {
      return NextResponse.json({ error: 'Job info not found' }, { status: 404 });
    }

    const description = jobInfo.description.slice(0, 700);
    const result = await streamText({
      model,
      prompt: `
You are an **AI Interview Evaluator**.  

Your task:
1️⃣ Generate a **complete, ideal model answer** to the given interview question.  
2️⃣ Compare the candidate’s answer with your ideal answer and provide **objective feedback**.  

---

### Job Information
- **Title:** ${jobInfo.title || 'N/A'}
- **Experience Level:** ${jobInfo.experience}
- **Description:** ${description}

---

### Question
${questionText}

---

### Candidate’s Answer
\`\`\`
${answer}
\`\`\`

---

### 🧠 Output Format (Use Markdown)

#### 🏆 **Evaluation Summary**
- **Rating (0–10):**  
- **Rating Label:** (Excellent / Good / Fair / Poor / Very Poor / No Attempt)

#### 💡 **Feedback Summary**
(2–3 sentences summarizing overall performance.)

#### ✅ **Strengths**
- (List 2–3 bullet points)

#### ⚠️ **Areas for Improvement**
- (List 2–3 bullet points)

#### 🧩 **Model Answer**
(Provide the AI-generated ideal answer for comparison.)

---

**Guidelines:**
- Keep the tone professional, concise, and structured.  
- Place the **rating and label at the very top** before feedback sections.  
- Do not include any commentary outside this format.`,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error('Error generating feedback:', error);
    let errorMessage = 'Failed to generate feedback';

    if (error instanceof Error) {
      console.error(error.message);
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      console.error(error);
      errorMessage = error;
    } else {
      console.error('An unknown error occurred');
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
