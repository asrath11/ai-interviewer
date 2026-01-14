import { google } from '@/services/ai/models/google';
import { generateObject } from 'ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authoption';
import { ResumeAnalysisSchema } from '@/lib/schemas/resume-analysis';

const model = google('gemini-2.5-flash');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get('file') as File;
    const jobInfoId = formData.get('jobInfoId') as string;

    if (!resumeFile || !jobInfoId) {
      return NextResponse.json(
        { error: 'Missing file or job info ID.' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jobInfo = await prisma.jobInfo.findFirst({
      where: { id: jobInfoId },
    });

    if (!jobInfo) {
      return NextResponse.json({ error: 'Job info not found.' }, { status: 404 });
    }

    const analysisPrompt = `
You are an expert resume reviewer and hiring advisor.

You will receive a candidate's resume as a file in the user prompt. This resume is being used to apply for a job with the following information:

Job Description:
\`\`\`
${jobInfo.description}
\`\`\`
Experience Level: ${jobInfo.experience}
${jobInfo.title ? `\nJob Title: ${jobInfo.title}` : ''}

Your task is to evaluate the resume against the job requirements and provide structured feedback using the following categories:

1. **ats** - Analysis of how well the resume matches ATS (Applicant Tracking System) requirements.
   - Consider layout simplicity, use of standard section headings, avoidance of graphics or columns, consistent formatting, etc.

2. **jobMatch** - Analysis of how well the resume aligns with the job description and experience level.
   - Assess skills, technologies, achievements, and relevance.

3. **writingAndFormatting** - Analysis of the writing quality, tone, grammar, clarity, and formatting.
   - Comment on structure, readability, section organization, and consistency.
   - Be sure to consider the wording and formatting of the job description when evaluating the resume so you can recommend specific wording or formatting changes that would improve the resume's alignment with the job requirements.

4. **keywordCoverage** - Analysis of how well the resume includes keywords or terminology from the job description.
   - Highlight missing or well-used terms that might help with ATS matching and recruiter readability.
   - Be sure to consider the keywords used in the job description when evaluating the resume so you can recommend specific keywords that would improve the resume's alignment with the job requirements.

5. **other** - Any other relevant feedback not captured above.
   - This may include things like missing contact info, outdated technologies, major red flags, or career gaps.

For each category, return:
- \`score\` (1-10): A number rating the resume in that category.
- \`summary\`: A short, high-level summary of your evaluation.
- \`feedback\`: An array of structured feedback items:
- \`type\`: One of \`"strength"\`, \`"minor-improvement"\`, or \`"major-improvement"\`
- \`name\`: A label for the feedback item.
- \`message\`: A specific and helpful explanation or recommendation.

Also return an overall score for the resume from 1-10 based on your analysis.

Only return the structured JSON response as defined by the schema. Do not include explanations, markdown, or extra commentary outside the defined format.

CRITICAL FORMATTING RULES:
- Output ONLY raw JSON without any markdown formatting
- DO NOT use \`\`\`json or any code block markers
- DO NOT include any explanatory text before or after the JSON
- Start with { and end with }
- Ensure the JSON is valid and properly formatted

Your response must be parseable by JSON.parse() without any preprocessing.

Other Guidelines:
- Tailor your analysis and feedback to the specific job description and experience level provided.
- Be clear, constructive, and actionable. The goal is to help the candidate improve their resume so it is ok to be critical.
- Refer to the candidate as "you" in your feedback. This feedback should be written as if you were speaking directly to the candidate.
- Stop generating output as soon you have provided the full feedback.
`;

    const result = await generateObject({
      model,
      schema: ResumeAnalysisSchema,
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume analysis assistant.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'file',
              data: await resumeFile.arrayBuffer(),
              mediaType: resumeFile.type,
            },
            {
              type: 'text',
              text: analysisPrompt,
            },
          ],
        },
      ],
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
