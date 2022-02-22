import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type LinkProps = Omit<ChakraLinkProps, keyof NextLinkProps> & NextLinkProps;

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  as,
  passHref,
  replace,
  scroll = true,
  shallow,
  isExternal,
  ...props
}) => {
  if (isExternal && typeof href === 'string') {
    return (
      <ChakraLink isExternal href={href} {...props}>
        {children}
      </ChakraLink>
    );
  }

  return (
    <NextLink
      {...{
        href,
        as,
        replace,
        scroll,
        shallow,
      }}
      passHref={passHref || true}
    >
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
};

export const ActiveLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const { asPath } = useRouter();

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const isActive = asPath === props.href || asPath === props.as;

  return (
    <Link
      fontWeight={isActive ? 700 : 400}
      color={isActive ? 'ceruleanBlue' : 'white'}
      {...props}
    >
      {children}
    </Link>
  );
};
