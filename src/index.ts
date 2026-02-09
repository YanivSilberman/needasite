import { Env, GenerateRequest, GenerateResponse, Site } from './types';
import { detectTemplate } from './templates';
import { generateSite } from './gemini';

/**
 * Generate a random site ID
 */
function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

/**
 * Serve the frontend HTML
 */
function serveFrontend(): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>needasite - The Simplest Website Builder</title>
  <meta name="description" content="Describe your website in one sentence. We'll build it instantly.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Inter', sans-serif; }
    .gradient-bg {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .loading {
      display: none;
    }
    .loading.active {
      display: flex;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse-slow {
      animation: pulse 2s ease-in-out infinite;
    }
  </style>
</head>
<body class="min-h-screen gradient-bg flex items-center justify-center p-4">
  <div class="w-full max-w-lg">
    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
      <!-- Logo -->
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">needasite</h1>
        <p class="text-gray-500 mt-1 text-sm sm:text-base">Describe it. We'll build it.</p>
      </div>

      <!-- Form -->
      <form id="generateForm" class="space-y-4">
        <div>
          <label for="prompt" class="sr-only">What website do you need?</label>
          <textarea
            id="prompt"
            name="prompt"
            rows="4"
            placeholder="A portfolio website for a photographer named Alex who specializes in landscape and nature photography..."
            class="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          id="submitBtn"
          class="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Build My Site
        </button>
      </form>

      <!-- Loading State -->
      <div id="loading" class="loading flex-col items-center justify-center py-8">
        <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
        <p class="text-gray-600 animate-pulse-slow">Building your site...</p>
        <p class="text-gray-400 text-sm mt-1">This takes about 10-15 seconds</p>
      </div>

      <!-- Result -->
      <div id="result" class="hidden mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="font-semibold text-green-800">Your site is ready!</span>
        </div>
        <a id="siteUrl" href="#" target="_blank" class="text-purple-600 hover:text-purple-700 font-medium break-all"></a>
        <div class="mt-3 flex gap-2">
          <a id="visitBtn" href="#" target="_blank" class="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white text-center text-sm font-medium rounded-lg transition">
            Visit Site
          </a>
          <button id="newBtn" class="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition">
            Build Another
          </button>
        </div>
      </div>

      <!-- Error -->
      <div id="error" class="hidden mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
        <div class="flex items-center gap-2 mb-1">
          <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span class="font-semibold text-red-800">Something went wrong</span>
        </div>
        <p id="errorMsg" class="text-red-600 text-sm"></p>
        <button id="retryBtn" class="mt-3 py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition">
          Try Again
        </button>
      </div>
    </div>

    <!-- Footer -->
    <p class="text-center text-white/60 text-sm mt-6">
      Powered by AI • Sites hosted free forever
    </p>
  </div>

  <script>
    const form = document.getElementById('generateForm');
    const prompt = document.getElementById('prompt');
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const siteUrl = document.getElementById('siteUrl');
    const visitBtn = document.getElementById('visitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const newBtn = document.getElementById('newBtn');
    const retryBtn = document.getElementById('retryBtn');

    function showLoading() {
      form.classList.add('hidden');
      loading.classList.add('active');
      result.classList.add('hidden');
      error.classList.add('hidden');
    }

    function showResult(url) {
      loading.classList.remove('active');
      result.classList.remove('hidden');
      siteUrl.href = url;
      siteUrl.textContent = url;
      visitBtn.href = url;
    }

    function showError(msg) {
      loading.classList.remove('active');
      error.classList.remove('hidden');
      errorMsg.textContent = msg;
    }

    function reset() {
      form.classList.remove('hidden');
      loading.classList.remove('active');
      result.classList.add('hidden');
      error.classList.add('hidden');
      prompt.value = '';
      prompt.focus();
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: prompt.value }),
        });

        const data = await res.json();

        if (data.success && data.url) {
          showResult(data.url);
        } else {
          showError(data.error || 'Failed to generate site');
        }
      } catch (err) {
        showError('Network error. Please try again.');
      }
    });

    newBtn.addEventListener('click', reset);
    retryBtn.addEventListener('click', reset);
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/**
 * Handle API request to generate a site
 */
async function handleGenerate(request: Request, env: Env): Promise<Response> {
  try {
    const body: GenerateRequest = await request.json();
    
    if (!body.prompt || body.prompt.trim().length < 10) {
      return Response.json(
        { success: false, error: 'Please provide a more detailed description' } as GenerateResponse,
        { status: 400 }
      );
    }

    // Detect template from prompt
    const template = detectTemplate(body.prompt);
    
    // Generate unique site ID
    const siteId = generateId();
    
    // Generate site with Gemini
    const html = await generateSite(body.prompt, template, siteId, env.GEMINI_API_KEY);
    
    // Store site in KV
    const site: Site = {
      id: siteId,
      prompt: body.prompt,
      html,
      createdAt: new Date().toISOString(),
      template: template.name,
    };
    
    await env.SITES.put(siteId, JSON.stringify(site), {
      expirationTtl: 60 * 60 * 24 * 365, // 1 year
    });

    // Get the host for building the URL
    const url = new URL(request.url);
    const siteUrl = `${url.protocol}//${url.host}/site/${siteId}`;

    return Response.json({
      success: true,
      id: siteId,
      url: siteUrl,
    } as GenerateResponse);
    
  } catch (err) {
    console.error('Generate error:', err);
    return Response.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' } as GenerateResponse,
      { status: 500 }
    );
  }
}

/**
 * Serve a generated site
 */
async function serveSite(siteId: string, env: Env): Promise<Response> {
  const data = await env.SITES.get(siteId);
  
  if (!data) {
    return new Response('Site not found', { status: 404 });
  }

  const site: Site = JSON.parse(data);
  
  return new Response(site.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

/**
 * Main request handler
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers for API
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API: Generate site
    if (path === '/api/generate' && request.method === 'POST') {
      const response = await handleGenerate(request, env);
      // Add CORS headers to response
      const headers = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));
      return new Response(response.body, { status: response.status, headers });
    }

    // Serve generated site
    if (path.startsWith('/site/')) {
      const siteId = path.replace('/site/', '');
      return serveSite(siteId, env);
    }

    // Serve frontend
    if (path === '/' || path === '') {
      return serveFrontend();
    }

    return new Response('Not found', { status: 404 });
  },
};
