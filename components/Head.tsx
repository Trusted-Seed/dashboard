import NextHead from 'next/head';

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
    {children}
  </NextHead>
);
