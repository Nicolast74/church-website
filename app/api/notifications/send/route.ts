import { sendPushNotification } from '@/lib/notifications';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, body, url } = await req.json();

    await sendPushNotification({ title, body, url });

    return NextResponse.json({ success: true });
  } catch (error) {
...
    console.error('Error in send-notification API:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
