import { Flex, Text, VStack } from '@chakra-ui/react';
import DashboardBGImage from 'assets/dashboard-bg.svg';

export const DashboardPage: React.FC = () => {
  const titleFontSize = { base: '3xl', lg: '4xl', xl: '5xl' };

  return (
    <>
      <Flex
        w="100%"
        h="0rem"
        _before={{
          content: '""',
          h: '200rem',
          maxH: '100%',
          width: '100%',
          top: '-30rem',
          left: '-36rem',
          pos: 'absolute',
          bg: `url(${DashboardBGImage.src})`,
          bgPos: 'top center',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack w="100%" py={8} px={24} zIndex={1} textAlign="center">
        <Text fontWeight="bold" fontSize={titleFontSize}>
          Dashboard
        </Text>
        <Flex h="100rem" />
      </VStack>
    </>
  );
};

export default DashboardPage;
