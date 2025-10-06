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
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobInfoId, difficulty } = RequestSchema.parse(body);

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Fetch job info and verify ownership
    const jobInfo = await prisma.jobInfo.findFirst({
      where: {
        id: jobInfoId,
      },
    });

    if (!jobInfo) {
      return NextResponse.json(
        { error: 'Job info not found or access denied' },
        { status: 404 }
      );
    }

    const description = jobInfo.description.slice(0, 500);

    // ✅ Generate and stream the question
    const result = await streamText({
      model,
      prompt: `Generate a ${difficulty} interview question for the role: ${jobInfo.title}.
      Job description: ${description}`,
      system: `
You are an AI assistant that creates technical interview questions tailored to a specific job role.
Your task is to generate **one unique, realistic, and relevant** technical question that matches the skill requirements of the job and aligns with the difficulty level provided by the user.

Job Information:
- Job Description: \`${jobInfo.description}\`
- Experience Level: \`${jobInfo.experience}\`
${jobInfo.title ? `- Job Title: \`${jobInfo.title}\`` : ""}

### Difficulty Guidelines
- **Easy** → Focus mainly on **JavaScript fundamentals**, especially:
  - let vs const, var scoping
  - Array methods (map, filter, reduce, forEach)
  - Promise basics & async/await
  - Closures, hoisting, default parameters
  - Basic DOM manipulation
  - Event handling (click, submit, etc.)
  - this keyword, binding, and arrow functions
  - If frontend frameworks are mentioned, include very simple concepts (props, state, JSX).
  - If backend technologies are mentioned, include basic concepts (CRUD operations, REST APIs, middleware).
  - Generate unique questions that are **realistic** and **aligned with the job description**.
- **Medium** → Create **practical, applied coding questions** using JavaScript + technologies from the job description (React, Node, DBs, APIs).
- **Hard** → Ask **advanced, real-world challenges** (system design, architecture, optimization, debugging, scaling).

### Variation & Randomness
- Never repeat the same exact question twice.
- Vary the **topic focus** each time (e.g., one time closures, another time promises, another time array methods).
- Use a **different format** sometimes (bullet points, code snippets, or scenario-based).
- Randomly choose *one* concept from the appropriate difficulty bucket.

### Output Instructions
- Return **only one unique question**, formatted in **Markdown**.
- Do **not** include an answer or hints.
- Stop immediately after providing the question.`,
    });

    return createTextStreamResponse({
      textStream: result.textStream,
    });

  } catch (error) {
    console.error('Error generating question:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}

