import type { APIRoute } from 'astro';

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_SERVICE_KEY;

export const GET: APIRoute = async () => {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/photos`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ limit: 100, offset: 0, sortBy: { column: 'created_at', order: 'desc' } })
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const fileName = `${Date.now()}-${file.name}`;
  const arrayBuffer = await file.arrayBuffer();

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/photos/${fileName}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': file.type,
      'x-upsert': 'true'
    },
    body: arrayBuffer
  });
  const data = await res.json();
  return new Response(JSON.stringify({ success: res.ok, path: fileName, data }), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  const { path } = await request.json();
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/photos/${path}`, {
    method: 'DELETE',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  return new Response(JSON.stringify({ success: res.ok }), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
};