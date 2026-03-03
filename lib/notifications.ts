import webpush from './webpush';
import { createClient } from './supabaseServer';

export async function sendPushNotification(payload: { title: string; body: string; url: string }) {
  const supabase = await createClient();

  // Fetch all subscriptions
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('*');

  if (error) {
    console.error('Error fetching subscriptions:', error);
    return;
  }

  if (!subscriptions || subscriptions.length === 0) {
    return;
  }

  const notificationPayload = JSON.stringify(payload);

  const sendPromises = subscriptions.map(async (sub) => {
    const pushSubscription = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth,
      },
    };

    try {
      await webpush.sendNotification(pushSubscription, notificationPayload);
    } catch (err: any) {
      // If subscription is expired or revoked (404 or 410), delete it
      if (err.statusCode === 404 || err.statusCode === 410) {
        console.warn(`Subscription ${sub.id} expired, deleting...`);
        await supabase.from('push_subscriptions').delete().eq('id', sub.id);
      } else {
        console.error(`Error sending push to ${sub.id}:`, err);
      }
    }
  });

  await Promise.allSettled(sendPromises);
}
