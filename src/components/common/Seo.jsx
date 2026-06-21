import { useEffect } from 'react';

export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.content = title;

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.content = description;
  }, [title, description]);

  return null;
}
