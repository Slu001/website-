import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { pin } = await request.json();
  const adminPin = import.meta.env.ADMIN_PIN;
  const friendPin = import.meta.env.FRIEND_PIN;

  if (pin === adminPin) {
    return new Response(JSON.stringify({ success: true, role: 'admin' }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  }
  if (pin === friendPin) {
    return new Response(JSON.stringify({ success: true, role: 'friend' }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify({ success: false }), {
    status: 401, headers: { 'Content-Type': 'application/json' }
  });
};