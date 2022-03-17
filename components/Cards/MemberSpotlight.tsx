import { StackProps, Text } from '@chakra-ui/react';
import { Card } from 'components/Card';

export const MemberSpotlightCard: React.FC<StackProps> = props => {
  return (
    <Card p={8} align="flex-start" {...props}>
      <Text
        fontSize={{ base: 'md', lg: 'lg' }}
        display="inline-block"
        whiteSpace="nowrap"
      >
        Member Spotlight
      </Text>
    </Card>
  );
};
