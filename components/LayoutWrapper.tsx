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
    <VStack spacing={0} w="100%" maxW="8xl" pb={16}>
      <Header />
      {children}
    </VStack>
  </Flex>
);
