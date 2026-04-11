'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Custom sanitization: strip dangerous tags while allowing safe HTML
// rehype-raw is needed for tables/formatting, but we remove script/iframe/etc.
const DANGEROUS_TAG_REGEX = /<\s*(script|iframe|object|embed|form|input|textarea|button|link|style|meta|base|applet)[^>]*>[\s\S]*?<\s*\/\s*\1[^>]*>/gi;
const DANGEROUS_SELF_CLOSING_REGEX = /<\s*(script|iframe|object|embed|form|input|textarea|button|link|style|meta|base|applet)[^>]*\/?\s*>/gi;
const EVENT_HANDLER_REGEX = /\s+on\w+\s*=\s*["'][^"']*["']/gi;
const JAVASCRIPT_URL_REGEX = /href\s*=\s*["']\s*javascript:/gi;

function sanitizeMarkdown(content: string): string {
  let sanitized = content;
  sanitized = sanitized.replace(DANGEROUS_TAG_REGEX, '');
  sanitized = sanitized.replace(DANGEROUS_SELF_CLOSING_REGEX, '');
  sanitized = sanitized.replace(EVENT_HANDLER_REGEX, '');
  sanitized = sanitized.replace(JAVASCRIPT_URL_REGEX, 'href="');
  return sanitized;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const safeContent = sanitizeMarkdown(content);

  return (
    <div className="markdown-section">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {safeContent}
      </ReactMarkdown>
    </div>
  );
}
