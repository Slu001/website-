import type { APIRoute } from 'astro';

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_SERVICE_KEY;

export const GET: APIRoute = async () => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visitors?order=created_at.desc&limit=50`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visitors`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(body)
  });
  return new Response(JSON.stringify({ success: res.ok }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};