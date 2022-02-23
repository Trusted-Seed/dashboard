import {
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import LandingBGImage from 'assets/landing-bg.svg';
import LandingBGFooterImage from 'assets/landing-bg-footer.svg';
import { Head } from 'components/Head';
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

const JoinUsButton: React.FC<FlexProps> = props => (
  <Flex {...props}>
    <Link href="/join" _hover={{}}>
      <Button
        size="lg"
        variant="outline"
        bg="blackAlpha.500"
        borderColor="ceruleanBlue"
        borderWidth="2px"
        borderRadius="full"
        px={12}
        color="ceruleanBlue"
        textTransform="uppercase"
        _hover={{ bg: 'blackAlpha.800' }}
        letterSpacing="0.4rem"
        _focus={{}}
        fontWeight="500"
      >
        Join Us
      </Button>
    </Link>
  </Flex>
);

export const HomePage: React.FC = () => (
  <>
    <Flex
      w="100%"
      h="30rem"
      _before={{
        content: '""',
        h: '200rem',
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
    <VStack w="100%" pt={8} px={24} pb={72} zIndex={1}>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Text fontWeight="bold" fontSize="7xl">
        {title}
      </Text>
      <Text fontWeight="light" fontSize="2xl">
        {subTitle}
      </Text>
      <JoinUsButton py={8} />
      <Flex h="12rem" />
      <VStack spacing={32}>
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
      <Text fontWeight="bold" fontSize="7xl">
        {title}
      </Text>
      <Text fontWeight="light" fontSize="2xl">
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
              icon={icon}
            />{' '}
          </Link>
        ))}
      </HStack>
    </VStack>
  </>
);

export default HomePage;
