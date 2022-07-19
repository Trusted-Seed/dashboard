import {
  Divider,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useApplication } from 'context/ApplicationContext';
import { useTokenInfoQuery } from 'graphql/autogen/types';
import { formatNumber } from 'utils/formatHelpers';
import { config } from 'web3';

import { ApplicationDetails } from './ApplicationDetails';
import { BadgesDisplay } from './BadgesDisplay';
import { PaymentDetails } from './PaymentDetails';
import { ScoreDisplay } from './ScoreDisplay';
import { SignatureDetails } from './SignatureDetails';

export const MembershipDetails: React.FC<{
  poapDeliveries: string[];
  poapIds: string[];
}> = ({ poapDeliveries, poapIds }) => {
  const { balance, maxTrustScore } = useApplication();

  const [{ data: supplyData }] = useTokenInfoQuery({
    variables: { address: config.TRUST.address },
  });

  const totalSupply = Number(
    supplyData?.token?.totalSupply
      ? supplyData.token.totalSupply.slice(0, -18)
      : 0,
  );
  const percentSupply = Number(
    totalSupply ? (balance * 100.0) / totalSupply : 0,
  );

  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <VStack w="100%" spacing={10}>
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        minH="18rem"
        w="100%"
        gap={12}
      >
        <ApplicationDetails />
        <SignatureDetails />
        <PaymentDetails display={{ base: 'none', xl: 'flex' }} />
      </SimpleGrid>
      <PaymentDetails
        display={{ base: 'flex', xl: 'none' }}
        w={{ base: '100%', lg: '50%' }}
      />
      <Divider borderColor="ceruleanBlue" borderBottomWidth="2px" />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} w="100%" gap={2}>
        {isSmallScreen ? (
          <VStack align="stretch" spacing={8}>
            <ScoreDisplay
              title="My $TRUST Score"
              value={formatNumber(balance.toFixed(0))}
              isEmpty={balance <= 0}
            />
            <ScoreDisplay
              title="% Of Total Supply"
              value={percentSupply.toFixed(2) + '%'}
              isEmpty={percentSupply <= 0}
            />
          </VStack>
        ) : (
          <>
            <ScoreDisplay
              title="My $TRUST Score"
              value={formatNumber(balance.toFixed(0))}
              isEmpty={balance <= 0}
            />
            <ScoreDisplay
              title="% Of Total Supply"
              value={percentSupply.toFixed(2) + '%'}
              isEmpty={percentSupply <= 0}
            />
          </>
        )}
        {isSmallScreen ? (
          <VStack align="stretch" spacing={8}>
            <ScoreDisplay
              title="$TRUST - Total Supply"
              value={formatNumber(totalSupply)}
            />
            <ScoreDisplay
              title="Max $TRUST Score"
              value={formatNumber(maxTrustScore)}
              isEmpty={maxTrustScore <= 0}
            />
          </VStack>
        ) : (
          <>
            <ScoreDisplay
              title="$TRUST - Total Supply"
              value={formatNumber(totalSupply)}
            />
            <ScoreDisplay
              title="Max $TRUST Score"
              value={formatNumber(maxTrustScore)}
              isEmpty={maxTrustScore <= 0}
            />
          </>
        )}
      </SimpleGrid>
      <Divider borderColor="ceruleanBlue" borderBottomWidth="2px" />
      <Text w="100%" align="left" pl="1.5rem">
        Bagdes
      </Text>
      <BadgesDisplay poapDeliveries={poapDeliveries} poapIds={poapIds} />
    </VStack>
  );
};
