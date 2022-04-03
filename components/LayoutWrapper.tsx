import { Flex, VStack } from '@chakra-ui/react';
import { Header } from 'components/Header';

export const LayoutWrapper: React.FC = ({ children }) => (
  <Flex
    justify="center"
    w="100%"
    bg="darkBG"
    minH="100vh"
    color="white"
    fontFamily="body"
    overflow="hidden"
  >
    <VStack
      spacing={0}
      w="100%"
      maxW="8xl"
      pb={16}
      display={{ base: 'flex', md: 'none' }}
    >
      <Flex
        justify="center"
        align="center"
        fontWeight="bold"
        textAlign="center"
        w="100%"
        h="100%"
        px={2}
      >
        Currently smaller screens are not supported.
        <br />
        Please switch to a larger screen to view this page.
      </Flex>
    </VStack>
    <VStack
      spacing={0}
      w="100%"
      maxW="8xl"
      pb={16}
      display={{ base: 'none', md: 'flex' }}
    >
      <Header />
      {children}
    </VStack>
  </Flex>
);
