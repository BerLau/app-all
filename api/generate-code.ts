import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GenerateCodeRequest {
  prompt: string;
  language: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API credentials from environment variables (server-side only)
  const apiUrl = process.env.DEEPSEEK_API;
  const apiKey = process.env.DEEPSEEK_KEY;

  if (!apiUrl || !apiKey) {
    return res.status(500).json({ 
      error: 'DeepSeek API not configured',
      fallback: true 
    });
  }

  try {
    const { prompt, language } = req.body as GenerateCodeRequest;

    if (!prompt || !language) {
      return res.status(400).json({ error: 'Missing required fields: prompt and language' });
    }

    // Call DeepSeek API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `******
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a helpful coding assistant. Generate ${language} code based on the user's request. Only provide the code without explanations unless asked.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'DeepSeek API error',
        fallback: true 
      });
    }

    const data = await response.json();
    const generatedCode = data.choices?.[0]?.message?.content || '';
    
    // Extract code from markdown code blocks if present
    const codeBlockMatch = generatedCode.match(/```[\w]*\s*([\s\S]*?)```/);
    const code = codeBlockMatch ? codeBlockMatch[1].trim() : generatedCode.trim();

    return res.status(200).json({ code });
  } catch (error) {
    console.error('Error in generate-code API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      fallback: true 
    });
  }
}
