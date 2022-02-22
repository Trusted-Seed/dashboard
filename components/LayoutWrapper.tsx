import { VStack } from '@chakra-ui/react';

import { Header } from './Header';

export const LayoutWrapper: React.FC = ({ children }) => (
  <VStack
    spacing={0}
    w="100%"
    bg="darkBG"
    minH="100vh"
    color="white"
    fontFamily="body"
  >
    <Header />
    {children}
  </VStack>
);
