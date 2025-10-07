import { google } from '@/services/ai/models/google';
import { streamText, createTextStreamResponse } from 'ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authoption';

const model = google('gemini-2.0-flash'); // ⚡ Fastest flash model

const RequestSchema = z.object({
  jobInfoId: z.string().min(1, "Job info ID is required"),
  resumeText: z.string().min(1, "Resume text is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobInfoId, resumeText } = RequestSchema.parse(body);

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Fetch job info
    const jobInfo = await prisma.jobInfo.findFirst({
      where: { id: jobInfoId },
    });

    if (!jobInfo) {
      return NextResponse.json(
        { error: 'Job info not found or access denied' },
        { status: 404 }
      );
    }

    const description = jobInfo.description.slice(0, 500);

    // ✅ Generate and stream the resume analysis
    const result = await streamText({
      model,
      prompt: `
You are an expert AI assistant specialized in resume analysis and job-to-resume matching.

Your task is to carefully analyze the **resume** against the given **job description** and provide a **scored report** (each score out of 10).

---

### 🧾 Job Description
${description}

---

### 📄 Resume
${resumeText}

---

### 🔍 Provide an In-Depth Analysis Covering the Following Sections

1. **ATS Compatibility (Score: X/10)**
   - Evaluate resume structure, formatting, and parseability by Applicant Tracking Systems (ATS).
   - Mention if tables, images, or non-standard fonts may cause parsing issues.
   - Give a score out of 10 based on how ATS-friendly the resume is.

2. **Job Match (Score: X/10)**
   - Compare the resume’s experience, skills, and achievements to the job requirements.
   - Evaluate alignment with the required role, experience level, and technical stack.
   - Score how closely the candidate fits the role.

3. **Keyword Relevance (Score: X/10)**
   - Extract key terms and technologies from the job description.
   - Identify which ones are present in the resume and which are missing.
   - Score based on overlap and relevance.

4. **Skills & Experience Alignment (Score: X/10)**
   - Judge whether the candidate’s actual projects, achievements, and experience reflect the skills required.
   - Mention specific strengths and weak spots.
   - Assign a score.

5. **Resume Presentation (Score: X/10)**
   - Assess visual clarity, readability, grammar, and layout consistency.
   - Check if the resume communicates impact effectively (quantified metrics, active verbs, etc.).
   - Provide a score.

6. **Improvement Recommendations**
   - Give practical, specific suggestions to raise each score (e.g., add missing keywords, quantify results, fix formatting).
   - Mention if the candidate should reframe or expand certain sections.

7. **Final Evaluation Summary (in Table Form)**
   | Category | Score (out of 10) | Key Comments |
   |-----------|------------------|---------------|
   | ATS Compatibility | X/10 | ... |
   | Job Match | X/10 | ... |
   | Keyword Relevance | X/10 | ... |
   | Skills & Experience | X/10 | ... |
   | Presentation | X/10 | ... |
   | **Overall Fit** | **X/10** | ... |

---

### 🧠 Output Format
- Use **Markdown** only.
- Include section headings and bullet points.
- Avoid JSON or code blocks.
- Be concise yet insightful — like an HR + technical recruiter hybrid analysis.

### 🎯 Goal
Deliver a **clear, professional analysis** that helps the candidate understand:
- How well they match the job.
- Which areas need improvement.
- What actions can improve their overall fit score.
      `,
    });

    return createTextStreamResponse({
      textStream: result.textStream,
    });

  } catch (error) {
    console.error('Error generating resume analysis:', error);
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
  }
}
