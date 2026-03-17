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
  const files = await res.json();
  if (!files.length) return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });

  // Get signed URLs for each photo
  const signedRes = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/photos`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      paths: files.map((f: any) => f.name),
      expiresIn: 3600
    })
  });
  const signed = await signedRes.json();

  const photos = files.map((f: any, i: number) => ({
    name: f.name,
    url: signed[i] ? `${SUPABASE_URL}/storage/v1${signed[i].signedURL}` : null
  }));

  return new Response(JSON.stringify(photos), {
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

  return new Response(JSON.stringify({ success: res.ok, path: fileName }), {
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