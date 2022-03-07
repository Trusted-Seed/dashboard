import { Text } from '@chakra-ui/react';
import { Card } from 'components/Card';

export const MemberCountCard: React.FC<{
  totalMembers?: number;
  isMembersPage?: boolean;
}> = ({ totalMembers = 0, isMembersPage = false }) => (
  <Card
    bg={isMembersPage ? 'membersCardBG' : 'cardBG'}
    textAlign="center"
    spacing={{ base: 4, lg: 8 }}
  >
    <Text fontSize={{ base: 'xl', lg: '2xl' }}>Total member count</Text>
    <Text
      color="ceruleanBlue"
      fontWeight="bold"
      fontSize={{ base: '7xl', lg: '8xl', xl: '9xl' }}
      lineHeight={{ base: '4rem', lg: '5rem', xl: '6rem' }}
    >
      {totalMembers}
    </Text>
  </Card>
);
