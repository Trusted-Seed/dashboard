import { PagePreview } from 'components/PagePreview';
import NetlifyIdentityWidget from 'netlify-identity-widget';
import { useEffect } from 'react';
import { slugs } from 'utils/content';

const isLocal = process.env.NEXT_PUBLIC_NETLIFY_ENV === 'development';

declare global {
  interface Window {
    netlifyIdentity?: typeof NetlifyIdentityWidget;
  }
}

const NetlifyPage: React.FC = () => {
  useEffect(() => {
    (async () => {
      window.netlifyIdentity = NetlifyIdentityWidget;
      const CMS = (await import('netlify-cms-app')).default;
      CMS.registerPreviewStyle('/preview.css');
      slugs.forEach(slug => {
        CMS.registerPreviewTemplate(slug, PagePreview);
      });
      CMS.init({
        config: {
          backend: {
            name: 'git-gateway',
            branch: 'dev',
          },
          local_backend: isLocal,
          collections: [],
        },
      });
    })();
  }, []);

  return null;
};

export default NetlifyPage;
