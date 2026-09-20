import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // Clean up stray "IMG" tokens before image markers and handle any __IMG__url__ formats
    let normalized = content.replace(/(?:^|\n)\s*IMG\s*(?=\n|!\[)/gi, '\n');
    normalized = normalized.replace(/__IMG__([^\s_]+)__/g, (_, url) => {
      const match = url.match(/([^\/]+\.png)/i);
      const src = match ? `/cbt_images/${match[1]}` : url;
      return `![Ilustrasi](${src})`;
    });

    // Replace markdown images ![alt](url) with a unique placeholder
    const imagePlaceholders: string[] = [];
    const textWithImgPlaceholders = normalized.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
      const idx = imagePlaceholders.length;
      imagePlaceholders.push(
        `<div class="my-3 text-center">
          <img src="${url}" alt="${alt || 'Ilustrasi Soal'}" class="max-h-72 max-w-full mx-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-white/95 p-1.5 object-contain" loading="lazy" />
        </div>`
      );
      return `__IMG_PH_${idx}__`;
    });

    // Split text into tokens by $$...$$ and $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    const parts = textWithImgPlaceholders.split(regex);

    const htmlParts = parts.map((part) => {
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
        // Normal text - escape HTML and preserve line breaks
        return part
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n\n/g, '<br/><br/>')
          .replace(/\n/g, '<br/>');
      }
    });

    let finalHtml = htmlParts.join('');

    // Restore image placeholders
    imagePlaceholders.forEach((imgHtml, idx) => {
      finalHtml = finalHtml.replace(`__IMG_PH_${idx}__`, imgHtml);
    });

    return finalHtml;
  }, [content]);

  return (
    <div 
      className={`leading-relaxed ${className}`} 
      dangerouslySetInnerHTML={{ __html: renderedHtml }} 
    />
  );
};
