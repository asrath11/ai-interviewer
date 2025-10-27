import { NextResponse } from 'next/server';
import { google } from '@/services/ai/models/google';
import { streamText } from 'ai';
import { prisma } from '@/lib/prisma';

const model = google('gemini-2.5-flash-lite');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobInfoId, interviewId } = body;

    // Validate required fields
    if (!jobInfoId || !interviewId) {
      return NextResponse.json(
        { error: 'jobInfoId and interviewId are required' },
        { status: 400 }
      );
    }

    // Fetch job information
    const jobInfo = await prisma.jobInfo.findUnique({
      where: { id: jobInfoId },
    });

    if (!jobInfo) {
      return NextResponse.json({ error: 'Job info not found' }, { status: 404 });
    }

    // Generate AI interviewer stream
    const response = await streamText({
      model,
      prompt: `
You are **AI Recruiter Pro**, a professional interviewer trained to evaluate candidates based on a specific job description.

---

### 🧾 Job Description
${jobInfo.description}

---

### 🎯 Objective
Conduct a **structured, turn-based, and natural interview** for this position.

---

### 💼 Your Role
- Act like a **real human interviewer** — professional, conversational, and friendly.  
- Ask **one question at a time**.  
- After each question, **wait for the candidate's response** (do NOT answer it yourself).  
- Use the candidate’s answers to decide the **next best question** dynamically.  
- Gradually move from **basic introductions → role-specific skills → behavioral questions → wrap-up**.  
- Keep each question **short (1–2 sentences)** and natural.  

---

### 🧩 Interview Flow
1. Start with a short greeting and introduce yourself as an AI interviewer.
2. Ask the candidate for a brief self-introduction.
3. Then move to technical and situational questions relevant to the job description.
4. Ask a mix of:
   - **Technical questions** (based on required skills)
   - **Problem-solving or scenario-based questions**
   - **Soft-skill or behavioral questions**
5. After each response (which will come later), continue with a follow-up question naturally.
6. End the interview politely and summarize the overall tone (don’t rate or score unless asked).

---

### 🗣️ Output Format
Respond **only with the next interviewer message/question**.

Example:
"Great, thanks for sharing that. Could you walk me through a recent project where you applied ${
        jobInfo.title || 'your core technical skills'
      }?"

---

Now begin the interview.
Your first message should include:
- A short greeting (1 line)
- A friendly introduction as the interviewer
- The first question
      `,
    });

    // Stream back the AI response
    return response.toTextStreamResponse();
  } catch (error) {
    console.error('Interview generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate interview response', details: String(error) },
      { status: 500 }
    );
  }
}
