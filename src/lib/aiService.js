import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

// Create client with dangerouslyAllowBrowser since this is a client-side hackathon app
const groq = apiKey ? new Groq({ apiKey, dangerouslyAllowBrowser: true }) : null;

/**
 * Call Groq API to analyze the resume against the job description
 * Returns structured JSON with matched skills, missing skills, etc.
 */
export const analyzeWithAI = async (resumeText, jobDescription, portfolioUrl = "") => {
  if (!groq) {
    throw new Error('Groq API Key not configured in .env');
  }

  const prompt = `
You are an expert HR ATS (Applicant Tracking System), Technical Recruiter, and Senior Software Architect.
I will provide a candidate's Resume Text, a Job Description, and an optional Portfolio URL.

Your task:
1. Extract ALL technical and soft skills from the Resume.
2. Extract REQUIRED skills and preferred skills from the Job Description.
3. Compare them to find "matchedSkills" and "missingSkills".
4. Calculate a "matchScore" (0-100) based strictly on how many of the JD's REQUIRED skills the candidate has.
5. IF a Portfolio URL is provided, perform a SIMULATED Deep Audit of the implementation quality (assuming standard best practices for the role) and provide a specific "portfolioAuditFeedback" section (1-2 sentences).
6. Perform a "Market Sync" check (simulating current Hiring Market demands for 2024-2025) and include it in the "marketSyncInsights".
7. Create an actionable "roadmap" array (3-5 items) of specific things the candidate needs to learn or build to bridge the gap.

OUTPUT FORMAT MUST BE STRICTLY MINIFIED JSON. NO MARKDOWN. NO EXTRA TEXT.
{
  "matchScore": 75,
  "resumeSkills": ["React", "JavaScript"],
  "jdSkills": ["React", "Node.js", "TypeScript"],
  "matchedSkills": ["React"],
  "missingSkills": ["Node.js", "TypeScript"],
  "roadmap": ["Learn Node.js basics", "Build an API", "Learn TypeScript"],
  "insight": "Candidate has strong frontend skills but lacks backend and typing.",
  "portfolioAuditFeedback": "High-fidelity vector match. Ensure your GitHub projects demonstrate clean architecture for the missing Node.js layer.",
  "marketSyncInsights": "Target role is currently in high demand. 2025 Market Sync indicates a shift towards AI-integrated workflows.",
  "role": "Full Stack Developer",
  "level": "Junior",
  "category": "Software Engineering"
}

Resume Text:
${resumeText.substring(0, 4000)}

Job Description:
${jobDescription.substring(0, 4000)}

Portfolio URL (Optional):
${portfolioUrl || "Not Provided"}
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    
    if (!responseContent) throw new Error("Empty response from Groq");
    
    return JSON.parse(responseContent);

  } catch (err) {
    console.error('Groq AI Analysis Error:', err);
    throw err;
  }
};
