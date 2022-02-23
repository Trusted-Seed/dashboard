import { Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';

type LandingSectionProps = {
  title: string;
  description: string;
  imageSrc: string;
  reversed?: boolean;
};

export const LandingSection: React.FC<LandingSectionProps> = ({
  title,
  description,
  imageSrc,
  reversed = false,
}) => (
  <SimpleGrid columns={2} gap={8}>
    <VStack
      spacing={0}
      my={32}
      pl={reversed ? 0 : 16}
      pr={reversed ? 16 : 0}
      align="flex-start"
    >
      <Text fontWeight="bold" fontSize="7xl">
        {title}
      </Text>
      <Text fontWeight="light" fontSize="2xl">
        {description}
      </Text>
    </VStack>
    <Flex
      pos="relative"
      h="100%"
      gridColumnStart={reversed ? 1 : 2}
      gridRowStart={1}
      _before={{
        content: '""',
        h: '50rem',
        width: '250%',
        top: '55%',
        left: reversed ? undefined : '3rem',
        right: !reversed ? undefined : '3rem',
        transform: 'translateY(-45%)',
        pos: 'absolute',
        bg: `url(${imageSrc})`,
        bgPos: reversed ? 'right center' : 'left center',
        bgRepeat: 'no-repeat',
      }}
    />
  </SimpleGrid>
);
