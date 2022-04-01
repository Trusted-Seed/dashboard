import { InitOptions } from 'netlify-cms-core';
import { useEffect } from 'react';

const prodConfig: InitOptions = {
  config: {
    backend: {
      name: 'git-gateway',
      branch: 'dev',
      commit_messages: {
        create: 'Create {{collection}} "{{slug}}" by {{author-login}}',
        update: 'Update {{collection}} "{{slug}}" by {{author-login}}',
        delete: 'Delete {{collection}} "{{slug}}" by {{author-login}}',
        uploadMedia: 'Upload "{{path}}" by {{author-login}}',
        deleteMedia: 'Delete "{{path}}" by {{author-login}}',
      },
    },
    collections: [],
  },
};

const localConfig: InitOptions = {
  config: {
    backend: {
      name: 'proxy',
      proxy_url: 'http://localhost:8081/api/v1',
    },
    collections: [],
  },
};

const NETLIFY_ENV = process.env.NEXT_PUBLIC_NETLIFY_ENV;

const netlifyConfig: InitOptions =
  NETLIFY_ENV === 'development' ? localConfig : prodConfig;

const NetlifyPage: React.FC = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default;
      CMS.init(netlifyConfig);
    })();
  }, []);

  return null;
};

export default NetlifyPage;
