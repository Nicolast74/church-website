import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const subscription = await req.json();
    const supabase = await createClient();

    // Check if subscription already exists to avoid duplicates
    const { error } = await supabase
      .from('push_subscriptions')
      .insert([
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      ]);

    // Ignore unique constraint violation (code 23505) if the user is already subscribed
    if (error && error.code !== '23505') throw error;

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error: unknown) {
    console.error('Error subscribing:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
