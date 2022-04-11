import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { useEffect, useRef } from 'react';

// https://github.com/netlify/netlify-cms/issues/793
export const PagePreview: React.FC<PreviewTemplateComponentProps> = ({
  entry,
}) => {
  const win = useRef<HTMLIFrameElement | null>(null);
  const data = entry.toJS();

  // home page is a special case without a slug
  let src = `${window.location.origin}/`;
  if (data.slug !== 'landing') {
    src += data.slug;
  }

  useEffect(() => {
    win.current?.contentWindow?.postMessage(data, location.origin);
  }, [data]);

  return (
    <iframe
      ref={win}
      title={data.slug}
      style={{ width: '100%', height: '100%' }}
      src={src}
    />
  );
};
