import type { APIRoute } from 'astro';

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_SERVICE_KEY;

export const GET: APIRoute = async () => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/notes?order=created_at.desc`, {
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
  const { content } = await request.json();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/notes`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ content })
  });
  return new Response(JSON.stringify({ success: res.ok }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/notes?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  return new Response(JSON.stringify({ success: res.ok }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};