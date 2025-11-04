import { google } from '@/services/ai/models/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authoption';

const model = google('gemini-2.0-flash'); // ⚡ Fast, cost-efficient

const RequestSchema = z.object({
  jobInfoId: z.string().min(1, 'Job info ID is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
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

    const description = jobInfo.description.slice(0, 600);

    // ✅ Generate and stream coding interview questions
    const result = await streamText({
      model,
      prompt: `
You are an AI assistant that creates technical interview questions tailored to a specific job role. 

Your task:
Generate **one realistic and relevant** technical question that matches the skill requirements of the given job and aligns with the difficulty level provided.

Job Information:
- Job Title: \`${jobInfo.title || 'N/A'}\`
- Experience Level: \`${jobInfo.experience}\`
- Difficulty Level: \`${difficulty}\`
- Job Description: \`${description}\`

Guidelines:
- The question must reflect the skills and technologies mentioned in the job description.
- Make sure the question matches the difficulty level (\`${difficulty}\`):
  - Easy → basic understanding or syntax-level problems.
  - Medium → practical, moderate complexity tasks or debugging.
  - Hard → deep system design, optimization, or advanced problem-solving.
- Prefer practical, real-world challenges over trivia.
- Return only **one** question (no answers).
- Format the output as **Markdown**, including any code snippets if relevant.
- Stop generating output once the question is complete.
  `,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating coding problem:', error);
    return NextResponse.json(
      { error: 'Failed to generate coding problem' },
      { status: 500 }
    );
  }
}
