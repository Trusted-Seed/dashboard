import NextHead from 'next/head';
import NextScript from 'next/script';

type HeadProps = {
  title?: string;
};

export const Head: React.FC<HeadProps> = ({
  children,
  title = 'Trusted Seed',
}) => (
  <NextHead>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <NextScript src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    {children}
  </NextHead>
);
