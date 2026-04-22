import { NextRequest } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const { to, layer1, layer2 } = await request.json();

  if (!to || !layer1) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured. Set it to enable emails.');
    return Response.json({ skipped: true });
  }

  const resend = new Resend(apiKey);

  const divider = '─'.repeat(60);

  const body = [
    'YOUR PROCESS DIAGNOSIS',
    'Ops Process Analyser — Process Intelligence Suite',
    divider,
    '',
    'LAYER 1: EXECUTIVE SUMMARY',
    divider,
    '',
    layer1,
    '',
    divider,
    '',
    'LAYER 2: FULL DIAGNOSIS',
    divider,
    '',
    layer2 || '(Full diagnosis not available)',
    '',
    divider,
    'Built by Vikrant Sharma — https://www.linkedin.com/in/vikrantsharma10/',
  ].join('\n');

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: [to],
    subject: 'Your Process Diagnosis — Ops Process Analyser',
    text: body,
  });

  return Response.json({ success: true });
}
