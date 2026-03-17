import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { to, subject, message } = await request.json();
  
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Sanuth <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      text: message
    })
  });

  const data = await res.json();
  return new Response(JSON.stringify({ success: res.ok, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};