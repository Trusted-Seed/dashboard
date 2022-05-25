import { Text, VStack } from '@chakra-ui/react';

export const ScoreDisplay: React.FC<{
  title: string;
  value: string;
  isEmpty?: boolean;
}> = ({ title, value, isEmpty }) => (
  <VStack w={{ base: 'auto', lg: '100%' }}>
    <VStack align="stretch" minW={{ base: '16rem', lg: 'unset' }}>
      <Text
        textTransform="uppercase"
        fontSize={{ base: 'md', md: 'lg', lg: 'md', xl: 'lg' }}
        letterSpacing="0.2rem"
      >
        {title}
      </Text>
      <Text
        color="ceruleanBlue"
        fontWeight="bold"
        fontSize={{ base: '5xl', md: '6xl', lg: '5xl', xl: '6xl' }}
        lineHeight="5rem"
      >
        {isEmpty ? '-' : value}
      </Text>
    </VStack>
  </VStack>
);
