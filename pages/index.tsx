import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import LandingBGImage from 'assets/landing-bg.svg';
import LandingBGFooterImage from 'assets/landing-bg-footer.svg';
import { IconButton } from 'components/Button';
import { JoinUsButton } from 'components/JoinUsButton';
import { LandingSection } from 'components/LandingSection';
import { Link } from 'components/Link';
import { attributes } from 'content/landing.md';
import { ICONS, LinkType } from 'utils/linkHelpers';

type Section = {
  title: string;
  description: string;
  image: string;
};

type LandingContentAttributes = {
  title: string;
  subTitle: string;
  date: Date;
  sections: Section[];
  links: LinkType[];
};

const { title, subTitle, sections, links } =
  attributes as LandingContentAttributes;

export const LandingPage: React.FC = () => {
  const titleFontSize = { base: '5xl', lg: '6xl', xl: '7xl' };
  const descFontSize = { base: 'xl', xl: '2xl' };

  return (
    <>
      <Flex
        w="100%"
        h="30rem"
        _before={{
          content: '""',
          h: '200rem',
          maxH: 'calc(100% - 20rem)',
          width: '200rem',
          top: '20rem',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          pos: 'absolute',
          bg: `url(${LandingBGImage.src})`,
          bgPos: 'center',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack w="100%" pt={8} px={24} pb={72} zIndex={1} textAlign="center">
        <Text fontWeight="bold" fontSize={titleFontSize}>
          {title}
        </Text>
        <Text fontWeight="light" fontSize={descFontSize}>
          {subTitle}
        </Text>
        <JoinUsButton py={8} />
        <Flex h="12rem" />
        <VStack spacing={{ base: 16, xl: 32 }}>
          {sections.map((section, k) => (
            <LandingSection key={k} {...section} reversed={k % 2 === 1} />
          ))}
        </VStack>
        <Flex
          h="28rem"
          pos="relative"
          _before={{
            content: '""',
            h: '60rem',
            width: '200vw',
            top: '40rem',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            pos: 'absolute',
            bg: `url(${LandingBGFooterImage.src})`,
            bgPos: 'center',
            bgRepeat: 'no-repeat',
            zIndex: -1,
          }}
        />
        <Text fontWeight="bold" fontSize={titleFontSize}>
          {title}
        </Text>
        <Text fontWeight="light" fontSize={descFontSize}>
          {subTitle}
        </Text>
        <JoinUsButton py={8} />
        <HStack>
          {links.map(({ label, iconType, url }, k) => (
            <Link key={k} href={url} isExternal>
              <IconButton
                fontSize="xl"
                aria-label={label}
                color="black"
                bg="white"
                icon={ICONS[iconType]}
              />
            </Link>
          ))}
        </HStack>
      </VStack>
    </>
  );
};

export default LandingPage;
