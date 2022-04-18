import { Box, Spinner, StackProps, VStack } from '@chakra-ui/react';
import { GLOW_ANIMATION } from 'styles/animations';

export const Card: React.FC<
  StackProps & { isLoading?: boolean; hasDot?: boolean }
> = ({ children, isLoading, hasDot, ...props }) => (
  <VStack
    p={{ base: 16, lg: 20, xl: 24 }}
    borderRadius={{ base: 'xl', lg: '2xl', xl: '3xl' }}
    bg="cardBG"
    boxShadow="md"
    spacing={4}
    textAlign="left"
    pos="relative"
    justify={isLoading ? 'center' : undefined}
    {...props}
  >
    {isLoading ? (
      <Spinner size="xl" thickness="4px" speed="0.65s" color="ceruleanBlue" />
    ) : (
      <>
        {children}
        {hasDot && (
          <Box
            pos="absolute"
            top={6}
            right={6}
            transform="translate(50%, -50%)"
            w="100%"
            h="100%"
            maxW={3}
            maxH={3}
            borderRadius="50%"
            bg="linear-gradient(270deg, #1BDD9D 0%, #2CC9CC 100%)"
            // bg="ceruleanBlue"
            m="0 !important"
            animation={GLOW_ANIMATION}
          />
        )}
      </>
    )}
  </VStack>
);
