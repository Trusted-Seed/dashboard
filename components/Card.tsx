import { StackProps, VStack } from '@chakra-ui/react';

export const Card: React.FC<StackProps> = ({ children, ...props }) => (
  <VStack
    p={{ base: 16, lg: 20, xl: 24 }}
    borderRadius={{ base: 'xl', lg: '2xl', xl: '3xl' }}
    bg="cardBG"
    boxShadow="md"
    textAlign="center"
    spacing={{ base: 4, lg: 8 }}
    {...props}
  >
    {children}
  </VStack>
);
