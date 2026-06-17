export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url, redirect }) => {
  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  const siteUrl = import.meta.env.SITE_URL ?? 'https://bad-bhvr-systems.vercel.app';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteUrl}/api/callback`,
    scope: 'repo,user',
    state: url.searchParams.get('state') ?? '',
  });

  return redirect(`https://github.com/login/oauth/authorize?${params}`);
};
