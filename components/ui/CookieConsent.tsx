"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Settings2, ShieldCheck } from "lucide-react";
import Link from "next/link";

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  essential: true, // Always true
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-preferences");
    if (!consent) {
      // Small delay so it doesn't pop up instantly on page load
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(consent));
      } catch (e) {
        console.error("Failed to parse cookie preferences", e);
      }
    }
  }, []);

  const savePreferences = (newPrefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent-preferences", JSON.stringify(newPrefs));
    setPreferences(newPrefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  };

  const saveSettings = () => {
    savePreferences(preferences);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-background/95 p-6 shadow-2xl backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div className="flex-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mb-2 text-foreground">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-base">Privasi Anda Penting</h3>
                </div>
                <p>
                  Kami menggunakan cookie untuk memastikan Anda mendapatkan pengalaman terbaik di website kami. 
                  Beberapa cookie sangat penting untuk berfungsinya website, sementara yang lain membantu kami 
                  meningkatkan layanan dengan menganalisis penggunaan website.{" "}
                  <Link href="/kebijakan-privasi" className="text-accent underline hover:text-accent/80 transition-colors">
                    Pelajari lebih lanjut di Kebijakan Privasi kami.
                  </Link>
                </p>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-border"
                >
                  <Settings2 className="h-4 w-4" />
                  Pengaturan
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                >
                  Tolak
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                >
                  Terima Semua
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setShowSettings(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative inline-block w-full max-w-lg transform overflow-hidden rounded-2xl border border-border bg-background text-left align-bottom shadow-2xl transition-all sm:my-8 sm:align-middle"
            >
              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-playfair font-semibold text-foreground">
                    Pengaturan Cookie
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">Cookie Esensial</h4>
                      <p className="text-sm text-muted-foreground">
                        Diperlukan agar website dapat berfungsi dengan baik. Tidak dapat dinonaktifkan.
                      </p>
                    </div>
                    <div className="flex h-6 items-center">
                      <div className="flex h-6 w-11 items-center justify-end rounded-full bg-accent/50 px-1 opacity-70 cursor-not-allowed">
                        <div className="h-4 w-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">Analitik</h4>
                      <p className="text-sm text-muted-foreground">
                        Membantu kami memahami bagaimana pengunjung berinteraksi dengan website.
                      </p>
                    </div>
                    <div className="flex h-6 items-center">
                      <button
                        type="button"
                        onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                          preferences.analytics ? "bg-accent" : "bg-muted-foreground/30"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            preferences.analytics ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">Pemasaran</h4>
                      <p className="text-sm text-muted-foreground">
                        Digunakan untuk menyampaikan konten yang lebih relevan untuk Anda.
                      </p>
                    </div>
                    <div className="flex h-6 items-center">
                      <button
                        type="button"
                        onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                          preferences.marketing ? "bg-accent" : "bg-muted-foreground/30"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            preferences.marketing ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={saveSettings}
                    className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
                  >
                    Simpan Pengaturan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
