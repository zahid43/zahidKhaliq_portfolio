import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'ZK Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL ?? 'zaahid.khaliq@gmail.com'],
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:12px;">
          <h2 style="color:#1E1B4B;margin:0 0 20px;">New Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7080;font-size:14px;width:80px;">Name</td>
              <td style="padding:8px 0;color:#1E1B4B;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7080;font-size:14px;">Email</td>
              <td style="padding:8px 0;color:#6366F1;"><a href="mailto:${email}" style="color:#6366F1;">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border-left:4px solid #6366F1;">
            <p style="color:#6b7080;font-size:13px;margin:0 0 8px;">Message</p>
            <p style="color:#1E1B4B;margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="color:#9490B8;font-size:12px;margin-top:20px;">Sent via your portfolio contact form. Reply directly to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
