// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class Name Merge Utility
 * - clsx ile koşullu class birleştirme
 * - tailwind-merge ile çakışan Tailwind class'larını güvenli şekilde birleştirme
 *
 * @example
 * cn("px-4 py-2", isPrimary && "bg-blue-500", "hover:scale-105")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}