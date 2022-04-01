import NetlifyIdentityWidget from 'netlify-identity-widget';
import { useEffect } from 'react';

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
