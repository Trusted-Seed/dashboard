import { useEffect, useState } from 'react';
import { ATTRIBUTES, SlugType } from 'utils/content';

export const usePageAttributes = <T>(slug: SlugType): T => {
  const [attributes, setAttributes] = useState<T>(ATTRIBUTES[slug]);

  useEffect(() => {
    const handleDataChange = (event: MessageEvent) => {
      if (
        event instanceof MessageEvent &&
        event.origin === window.origin &&
        event.data?.slug === slug
      ) {
        setAttributes(event.data.data);
      }
    };
    window.addEventListener('message', handleDataChange);
    return () => window.removeEventListener('message', handleDataChange);
  }, [slug]);

  return attributes;
};
