import NextHead from 'next/head';
import NextScript from 'next/script';

type HeadProps = {
  title?: string;
  disableScripts?: boolean;
};

export const Head: React.FC<HeadProps> = ({
  children,
  title = 'Trusted Seed',
  disableScripts = false,
}) => (
  <>
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {children}
    </NextHead>
    {!disableScripts && (
      <NextScript // HubSpot
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js-na1.hs-scripts.com/8132714.js"
      />
    )}
  </>
);
