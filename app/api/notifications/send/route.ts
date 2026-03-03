import { sendPushNotification } from '@/lib/notifications';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, body, url } = await req.json();

    // In a real app, you'd check for admin session here
    // For MVP, we assume this is called from an authorized admin action
    
    await sendPushNotification({ title, body, url });

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    console.error('Error in send-notification API:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
