import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // Split text into tokens by $$...$$ and $...$
    // Pattern matches both display math and inline math
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    const parts = content.split(regex);

    return parts.map((part) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        try {
          return `<div class="my-2 overflow-x-auto py-1">${katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
          })}</div>`;
        } catch {
          return `<div>${part}</div>`;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        try {
          return `<span class="inline-block px-0.5">${katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
          })}</span>`;
        } catch {
          return `<span>${part}</span>`;
        }
      } else {
        // Normal text - preserve line breaks
        return part
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n\n/g, '<br/><br/>')
          .replace(/\n/g, '<br/>');
      }
    }).join('');
  }, [content]);

  return (
    <div 
      className={`leading-relaxed ${className}`} 
      dangerouslySetInnerHTML={{ __html: renderedHtml }} 
    />
  );
};
