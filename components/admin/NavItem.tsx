'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function NavItem({ href, label, icon: Icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all group ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-950/20'
          : 'text-(--muted) hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400'
      }`}
    >
      <Icon className={`h-4 w-4 mr-3 transition-colors ${isActive ? 'text-white' : ''}`} />
      {label}
    </Link>
  );
}
