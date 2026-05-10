import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD',
  }).format(amount);
}

export function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp));
}
