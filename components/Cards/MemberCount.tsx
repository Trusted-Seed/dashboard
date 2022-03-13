import { Spinner, Text } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { useTokenInfoQuery } from 'graphql/autogen/types';
import { config } from 'web3';

export const MemberCountCard: React.FC<{
  isMembersPage?: boolean;
}> = ({ isMembersPage = false }) => {
  const [{ fetching, data }] = useTokenInfoQuery({
    variables: { address: config.CSTK.address },
  });

  const totalMembers = data?.token?.numMembers ?? 0;
  return (
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
        {fetching ? <Spinner /> : totalMembers}
      </Text>
    </Card>
  );
};
