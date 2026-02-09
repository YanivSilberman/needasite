import { GeminiResponse, Template } from './types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Generate a website using Gemini
 */
export async function generateSite(
  prompt: string,
  template: Template,
  siteId: string,
  apiKey: string
): Promise<string> {
  const systemPrompt = buildSystemPrompt(template, siteId);
  
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: systemPrompt },
            { text: `USER REQUEST:\n${prompt}\n\nGenerate the complete HTML file now:` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data: GeminiResponse = await response.json();
  
  if (data.error) {
    throw new Error(`Gemini error: ${data.error.message}`);
  }

  const html = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!html) {
    throw new Error('No HTML generated');
  }

  // Extract just the HTML if wrapped in markdown code blocks
  return extractHtml(html);
}

/**
 * Build the system prompt for Gemini
 */
function buildSystemPrompt(template: Template, siteId: string): string {
  return `You are a professional web developer building a ${template.name} website.

TEMPLATE: ${template.name}
DESCRIPTION: ${template.description}
COMPONENTS TO INCLUDE: ${template.components.join(', ')}

REQUIREMENTS:
1. Generate a COMPLETE, valid HTML5 document
2. Use Tailwind CSS via CDN for styling
3. Make it mobile-first and fully responsive
4. Use modern, clean design with good typography
5. Include proper SEO meta tags (title, description, og tags)
6. Use semantic HTML (header, main, section, footer)
7. Include placeholder images from https://picsum.photos/
8. Make it visually impressive and professional
9. Use a cohesive color scheme
10. Ensure all text is readable and accessible

STRUCTURE:
- Start with <!DOCTYPE html>
- Include <meta charset="UTF-8"> and viewport meta
- Include Tailwind CSS: <script src="https://cdn.tailwindcss.com"></script>
- Include Inter font from Google Fonts
- Use smooth scroll behavior

SITE ID: ${siteId}

OUTPUT: Generate ONLY the complete HTML file, no explanations or markdown.`;
}

/**
 * Extract HTML from potential markdown code blocks
 */
function extractHtml(text: string): string {
  // Remove markdown code block markers if present
  let html = text.trim();
  
  // Handle ```html ... ``` format
  const htmlBlockMatch = html.match(/```html\s*([\s\S]*?)```/);
  if (htmlBlockMatch) {
    html = htmlBlockMatch[1].trim();
  }
  
  // Handle ``` ... ``` format
  const blockMatch = html.match(/```\s*([\s\S]*?)```/);
  if (blockMatch && !htmlBlockMatch) {
    html = blockMatch[1].trim();
  }
  
  // Ensure it starts with DOCTYPE or html
  if (!html.toLowerCase().startsWith('<!doctype') && !html.toLowerCase().startsWith('<html')) {
    // Try to find the start of HTML
    const doctypeIndex = html.toLowerCase().indexOf('<!doctype');
    const htmlIndex = html.toLowerCase().indexOf('<html');
    const startIndex = Math.min(
      doctypeIndex >= 0 ? doctypeIndex : Infinity,
      htmlIndex >= 0 ? htmlIndex : Infinity
    );
    if (startIndex < Infinity) {
      html = html.substring(startIndex);
    }
  }
  
  return html;
}
