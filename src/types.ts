/**
 * Environment bindings for Cloudflare Worker
 */
export interface Env {
  SITES: KVNamespace;
  GEMINI_API_KEY: string;
  ENVIRONMENT: string;
}

/**
 * Generated site data stored in KV
 */
export interface Site {
  id: string;
  prompt: string;
  html: string;
  createdAt: string;
  template?: string;
}

/**
 * API request to generate a new site
 */
export interface GenerateRequest {
  prompt: string;
}

/**
 * API response after generating a site
 */
export interface GenerateResponse {
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}

/**
 * Template definition
 */
export interface Template {
  name: string;
  description: string;
  components: string[];
  keywords: string[];
}

/**
 * Gemini API response structure
 */
export interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}
