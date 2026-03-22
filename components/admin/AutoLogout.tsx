'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { toast } from 'sonner';

const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
const THROTTLE_MS = 1000; // Throttle resets to max once per second

export function AutoLogout() {
  const router = useRouter();
  const supabase = createClient();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActiveRef = useRef<number>(0);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    toast.error('Sesi telah berakhir karena tidak ada aktivitas.');
    router.push('/admin/login');
    router.refresh();
  }, [router, supabase.auth]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(logout, TIMEOUT_MS);
  }, [logout]);

  useEffect(() => {
    resetTimer();

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastActiveRef.current > THROTTLE_MS) {
        lastActiveRef.current = now;
        resetTimer();
      }
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer]);

  return null;
}
