import NextHead from 'next/head';

export const Head: React.FC = ({ children }) => (
  <NextHead>
    <title> Trusted Seed </title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {children}
  </NextHead>
);
