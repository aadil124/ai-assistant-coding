/**
 * Sanitizes HTML content on the backend to prevent XSS (HTML Injection) attacks
 * @param {string} html - The raw HTML content
 * @returns {string} - The sanitized HTML content
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') return '';

  // 1. Remove script tags and their contents
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 2. Remove iframe tags and their contents
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 3. Remove inline event handlers (onmouseover, onclick, onload, etc.)
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, '');

  // 4. Remove javascript: links and sources
  sanitized = sanitized.replace(/(href|src)\s*=\s*["']\s*javascript:[^"']*["']/gi, '');

  return sanitized;
};
