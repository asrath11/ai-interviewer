import { google } from '@/services/ai/models/google';
import { streamText, createTextStreamResponse } from 'ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const model = google('gemini-2.0-flash'); // ⚡ Fastest Gemini model for text

const RequestSchema = z.object({
    jobInfoId: z.string().min(1, "Job info ID is required"),
    questionText: z.string().min(1, "Question ID is required"),
    answer: z.string().min(10, "Answer text is required for feedback"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { jobInfoId, questionText, answer } = RequestSchema.parse(body);

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
You are an AI assistant for technical interviews.  

1️⃣ First, generate a **complete and correct answer** to the following interview question.  
2️⃣ Then, evaluate the candidate’s answer against your generated answer.  

Provide detailed feedback in **Markdown** format including:  
- Feedback Summary (2–3 sentences)  
- Strengths (bullet points)  
- Areas for Improvement (bullet points)  
- Rating (0–10)  
- Rating Label (Excellent, Good, Fair, Poor, Very Poor, or No Attempt)  

---

### Job Information
- Title: ${jobInfo.title || 'N/A'}
- Experience Level: ${jobInfo.experience}
- Description: ${description}

### Question
${questionText}

### Candidate’s Answer
\`\`\`
${answer}
\`\`\`

### Output Instructions
- Include the **AI’s model answer** for reference.
- Be professional, concise, and clear.
- Stop after providing feedback; no extra commentary.`,
        });

        return createTextStreamResponse({
            textStream: result.textStream,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
