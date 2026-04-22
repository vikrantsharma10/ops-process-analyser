import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { to, layer1, layer2 } = await request.json();

  if (!to || !layer1) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    // SMTP not configured — silently skip rather than error
    console.warn('SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS to enable emails.');
    return Response.json({ skipped: true });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: smtpUser, pass: smtpPass },
  });

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

  await transporter.sendMail({
    from: process.env.SMTP_FROM || smtpUser,
    to,
    subject: 'Your Process Diagnosis — Ops Process Analyser',
    text: body,
  });

  return Response.json({ success: true });
}
