import { Spinner, StackProps, VStack } from '@chakra-ui/react';

export const Card: React.FC<StackProps & { isLoading?: boolean }> = ({
  children,
  isLoading,
  ...props
}) => (
  <VStack
    p={{ base: 16, lg: 20, xl: 24 }}
    borderRadius={{ base: 'xl', lg: '2xl', xl: '3xl' }}
    bg="cardBG"
    boxShadow="md"
    spacing={4}
    textAlign="left"
    justify={isLoading ? 'center' : undefined}
    {...props}
  >
    {isLoading ? (
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        mb={8}
        color="ceruleanBlue"
      />
    ) : (
      children
    )}
  </VStack>
);
