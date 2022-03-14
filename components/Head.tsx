import NextHead from 'next/head';
import NextScript from 'next/script';

export const Head: React.FC = ({ children }) => (
  <NextHead>
    <title> Trusted Seed </title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <NextScript src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    {children}
  </NextHead>
);
