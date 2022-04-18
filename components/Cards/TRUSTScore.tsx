import { StackProps, Text, VStack } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useApplication } from 'context/ApplicationContext';
import { useTokenInfoQuery } from 'graphql/autogen/types';
import { config, useWallet } from 'web3';

export const TRUSTScoreCard: React.FC<StackProps> = props => {
  const { isConnected, isConnecting, connectWallet } = useWallet();
  const { balance } = useApplication();

  const [{ data: supplyData }] = useTokenInfoQuery({
    variables: { address: config.TRUST.address },
  });

  const totalSupply = Number(supplyData?.token?.totalSupply ?? 0);
  const percentSupply = Number(
    totalSupply ? (balance * 100.0) / totalSupply : 0,
  );

  return (
    <Card p={8} align="flex-start" {...props}>
      <Text
        fontSize={{ base: 'md', lg: 'lg' }}
        display="inline-block"
        whiteSpace="nowrap"
      >
        TRUST Score
      </Text>
      <VStack spacing={4} align="flex-start" justify="flex-end" flex={1}>
        {isConnected ? (
          <>
            <VStack spacing={0} align="flex-start">
              <Text
                textTransform="uppercase"
                letterSpacing="0.25rem"
                fontSize="sm"
              >
                My TRUST Score
              </Text>
              <Text color="ceruleanBlue" fontWeight="bold" fontSize="2.5rem">
                {balance.toFixed(3)}
              </Text>
            </VStack>
            <VStack spacing={0} align="flex-start">
              <Text
                textTransform="uppercase"
                letterSpacing="0.25rem"
                fontSize="sm"
              >
                % of Total Supply
              </Text>
              <Text color="ceruleanBlue" fontWeight="bold" fontSize="2.5rem">
                {percentSupply.toFixed(3)}%
              </Text>
            </VStack>
            <VStack spacing={0} align="flex-start">
              <Text
                textTransform="uppercase"
                letterSpacing="0.25rem"
                fontSize="sm"
              >
                Total TRUST Supply
              </Text>
              <Text color="ceruleanBlue" fontWeight="bold" fontSize="2.5rem">
                {totalSupply.toLocaleString()}
              </Text>
            </VStack>
          </>
        ) : (
          <>
            <Text>Connect wallet to view your details</Text>
            <Button onClick={connectWallet} isLoading={isConnecting}>
              Connect Wallet
            </Button>
          </>
        )}
      </VStack>
    </Card>
  );
};
