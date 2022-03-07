import { Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import LandingBGImage from 'assets/landing-bg.svg';
import LandingBGFooterImage from 'assets/landing-bg-footer.svg';
import { JoinUsButton } from 'components/JoinUsButton';
import { LandingSection } from 'components/LandingSection';
import { Link } from 'components/Link';
import { attributes } from 'content/home.md';
import { contactInfo } from 'utils/contactInfo';

type Section = {
  title: string;
  description: string;
  imageSrc: string;
};

type HomeContentAttributes = {
  title: string;
  subTitle: string;
  date: Date;
  sections: Section[];
};

const { title, subTitle, sections } = attributes as HomeContentAttributes;

export const HomePage: React.FC = () => {
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
          {contactInfo.map(({ label, icon, url }, k) => (
            <Link key={k} href={url} isExternal>
              <IconButton
                fontSize="xl"
                borderRadius="50%"
                aria-label={label}
                color="black"
                bg="white"
                _hover={{ bg: 'ceruleanBlue' }}
                icon={icon}
              />
            </Link>
          ))}
        </HStack>
      </VStack>
    </>
  );
};

export default HomePage;
