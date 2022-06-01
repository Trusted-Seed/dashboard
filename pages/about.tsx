import { Text, VStack } from '@chakra-ui/react';
import AboutBGImage from 'assets/about-bg.svg';
import { JoinUsButton } from 'components/JoinUsButton';
import { Link } from 'components/Link';
import { usePageAttributes } from 'hooks/usePageAttributes';
import ReactMarkdown from 'react-markdown';

export type AboutContentAttributes = {
  title: string;
  description: string;
};

export const AboutPage: React.FC = () => {
  const { title, description } =
    usePageAttributes<AboutContentAttributes>('about');
  const titleFontSize = { base: '5xl', lg: '6xl', xl: '7xl' };
  const descFontSize = { base: 'xl', xl: '2xl' };

  return (
    <VStack
      w="100%"
      p={16}
      bg={`url(${AboutBGImage.src})`}
      bgPos="top center"
      bgRepeat="no-repeat"
      textAlign="center"
    >
      <Text fontWeight="bold" fontSize={titleFontSize}>
        {title}
      </Text>
      <Text fontWeight="light" fontSize={descFontSize} maxWidth="60%">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <Link
                color="ceruleanBlue"
                isExternal
                href={href?.toString() ?? '#'}
              >
                {children}
              </Link>
            ),
            p: ({ children }) => <Text mb={5}>{children}</Text>,
          }}
        >
          {description}
        </ReactMarkdown>
      </Text>
      <JoinUsButton py={8} />
    </VStack>
  );
};

export default AboutPage;
