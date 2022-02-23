import { VStack } from '@chakra-ui/react';
import AboutBGImage from 'assets/about-bg.svg';
import { LandingSection } from 'components/LandingSection';
import { attributes } from 'content/about.md';

type AboutContentAttributes = {
  title: string;
  description: string;
  imageSrc: string;
};

const { title, description } = attributes as AboutContentAttributes;

export const AboutPage: React.FC = () => (
  <VStack
    w="100%"
    p={16}
    bg={`url(${AboutBGImage.src})`}
    bgPos="top center"
    bgRepeat="no-repeat"
  >
    <LandingSection {...{ title, description, imageSrc: '' }} withButton />
  </VStack>
);

export default AboutPage;
