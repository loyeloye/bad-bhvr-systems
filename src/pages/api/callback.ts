export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state') ?? '';

  if (!code) {
    return errorPage('Missing OAuth code from GitHub.');
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: import.meta.env.GITHUB_CLIENT_ID,
        client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
        code,
        state,
      }),
    });

    const data = await res.json() as { access_token?: string; error?: string };

    if (data.error || !data.access_token) {
      return errorPage(data.error ?? 'GitHub returned no token.');
    }

    const token = data.access_token;
    const content = JSON.stringify({ token, provider: 'github' });

    return new Response(
      `<!DOCTYPE html><html><body><script>
        (function() {
          function receiveMessage(e) {
            window.opener.postMessage(
              'authorization:github:success:${content.replace(/'/g, "\\'")}',
              e.origin
            );
          }
          window.addEventListener('message', receiveMessage, false);
          window.opener.postMessage('authorizing:github', '*');
        })();
      </script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    return errorPage('Token exchange failed.');
  }
};

function errorPage(msg: string) {
  return new Response(
    `<!DOCTYPE html><html><body><script>
      window.opener.postMessage('authorization:github:error:${msg}', '*');
    </script></body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  );
}
