import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { pin } = await request.json();
  const correctPin = import.meta.env.ADMIN_PIN;
  
  if (pin === correctPin) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: false }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
};