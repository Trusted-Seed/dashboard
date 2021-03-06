import { StackProps, Text } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { useTokenInfoQuery } from 'graphql/autogen/types';
import { formatNumber } from 'utils/formatHelpers';
import { config } from 'web3';

export const MemberCountCard: React.FC<
  {
    isMembersPage?: boolean;
  } & StackProps
> = ({ isMembersPage = false, ...props }) => {
  const [{ fetching, data }] = useTokenInfoQuery({
    variables: { address: config.TRUST.address },
  });

  const totalMembers = Number(data?.token?.numMembers ?? 0);
  return (
    <Card
      bg={isMembersPage ? 'membersCardBG' : 'cardBG'}
      textAlign="center"
      spacing={{ base: 4, lg: 8 }}
      justify="center"
      isLoading={fetching}
      {...props}
    >
      <Text
        fontSize={{ base: 'xl', lg: '2xl' }}
        display="inline-block"
        fontWeight="bold"
        whiteSpace="nowrap"
      >
        Total member count
      </Text>
      <Text
        color="ceruleanBlue"
        fontWeight="bold"
        fontSize={{ base: '7xl', lg: '8xl', xl: '9xl' }}
        lineHeight={{ base: '4rem', lg: '5rem', xl: '6rem' }}
      >
        {formatNumber(totalMembers)}
      </Text>
    </Card>
  );
};
