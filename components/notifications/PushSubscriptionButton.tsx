'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PushSubscriptionButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      checkSubscription();
    } else {
      setLoading(false);
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async () => {
    setLoading(true);
    try {
      const res = await Notification.requestPermission();

      if (res !== 'granted') {
        toast.error('Izin notifikasi ditolak');
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
          throw new Error('VAPID Public Key not found');
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      if (response.ok) {
        setIsSubscribed(true);
        toast.success('Notifikasi berhasil diaktifkan!');
      } else {
        throw new Error('Failed to save subscription');
      }
    } catch (error) {
      const err = error as Error;
      console.error('Error subscribing:', error);
      toast.error('Gagal mengaktifkan notifikasi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        toast.success('Notifikasi dinonaktifkan');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast.error('Gagal menonaktifkan notifikasi');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button disabled className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-400 text-sm font-medium">
        <Loader2 className="w-4 h-4 animate-spin" />
        Checking...
      </button>
    );
  }

  if (isSubscribed) {
    return (
      <button
        onClick={unsubscribe}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all text-sm font-medium border border-indigo-100"
      >
        <Bell className="w-4 h-4" />
        Notifikasi Aktif
      </button>
    );
  }

  return (
    <button
      onClick={subscribe}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium border border-gray-200 shadow-sm"
    >
      <BellOff className="w-4 h-4 text-gray-400" />
      Aktifkan Notifikasi
    </button>
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
