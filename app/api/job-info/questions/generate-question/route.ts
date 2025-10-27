import { google } from '@/services/ai/models/google';
import { streamText, createTextStreamResponse } from 'ai';
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
You are an **AI technical interviewer**. Your role is to generate a **coding challenge** that accurately tests a developer's practical and conceptual ability according to the given difficulty level and job description.

---

### 🧾 Job Description (trimmed)
${description}

---

### 🎚️ Difficulty
${difficulty.toUpperCase()}

---

### 🧠 Instructions
Generate **exactly one coding challenge** that:
- Matches the candidate’s target difficulty.
- Is **relevant to the job’s tech stack** (e.g., frontend/backend or full-stack context).
- Requires writing **actual code** (not multiple-choice or theoretical answers).
- Includes **clear input/output requirements** and **at least one sample test case**.
- Specifies the **expected time complexity**.
- Explains **what concepts or reasoning a strong solution should show**.
- Output should be in **clean Markdown**, **no JSON**.

---

### 🎯 Difficulty Guidelines

**Easy (JavaScript Foundations):**
Focus on core JavaScript concepts such as:
- Variables: \`var\`, \`let\`, \`const\`
- Scope and closures
- Arrays and strings (map, filter, reduce, loops)
- Async basics (\`setTimeout\`, \`async/await\`, Promises)
- Conditional logic and functions (including arrow functions)
- Simple DOM or event-based tasks (if frontend-related)

Example types of problems:
- Reverse a string without using built-in methods
- Count occurrences of words in a sentence
- Implement a delay function using Promises
- Toggle a button’s text on click (frontend)

---

**Medium (Scenario-Based: Frontend + Backend):**
Focus on **real-world application-level coding** — both frontend and backend.
- **Frontend:** React/DOM logic, event handling, state management, API fetching, debouncing, etc.
- **Backend:** Express.js route logic, asynchronous data flow, API rate limiting, error handling, data manipulation.

Example types of problems:
- Implement a custom debounce hook in React.
- Build a simple Express.js endpoint that paginates data.
- Create a function to merge and sort two API responses.
- Implement a simple localStorage caching utility for fetched data.

These questions should simulate real coding scenarios — not purely algorithmic puzzles.

---

**Hard (Advanced/Systems & Algorithms):**
Focus on complex design or optimization challenges:
- Advanced algorithms (graphs, DP, concurrency)
- Full-stack system design
- Complex async coordination, caching, or rate limiting
- Optimized backend logic or distributed workflows

---

### 🧾 Output Format

#### Coding Challenge
**Title:**  
**Difficulty:** ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}

**Problem Description:**  
(Explain the problem clearly and specify the goal.)

**Function Signature (if applicable):**  
\`\`\`js
function solve(input) {
  // Your code here
}
\`\`\`

**Input Example:**  
\`\`\`
<example input>
\`\`\`

**Output Example:**  
\`\`\`
<example output>
\`\`\`

**Expected Time Complexity:**  
O(...)

**Strong Solution Should Include:**  
(Explain what key concepts or patterns an ideal answer should demonstrate.)
      `,
    });

    return createTextStreamResponse({
      textStream: result.textStream,
    });
  } catch (error) {
    console.error('Error generating coding problem:', error);
    return NextResponse.json(
      { error: 'Failed to generate coding problem' },
      { status: 500 }
    );
  }
}
