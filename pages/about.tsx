import { VStack } from '@chakra-ui/react';
import AboutBGImage from 'assets/about-bg.svg';
import { LandingSection } from 'components/LandingSection';
import { usePageAttributes } from 'hooks/usePageAttributes';

export type AboutContentAttributes = {
  title: string;
  description: string;
};

export const AboutPage: React.FC = () => {
  const { title, description } =
    usePageAttributes<AboutContentAttributes>('about');

  return (
    <VStack
      w="100%"
      p={16}
      bg={`url(${AboutBGImage.src})`}
      bgPos="top center"
      bgRepeat="no-repeat"
    >
      <LandingSection {...{ title, description, image: '' }} withButton />
    </VStack>
  );
};

export default AboutPage;
