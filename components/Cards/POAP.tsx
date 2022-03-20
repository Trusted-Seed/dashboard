import { Image, StackProps, Text } from '@chakra-ui/react';
import POAPImage from 'assets/poap.svg';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useCallback } from 'react';
import { useWallet } from 'web3';

export const POAPCard: React.FC<StackProps> = props => {
  const { isConnected, isConnecting, connectWallet, disconnect } = useWallet();

  const onClick = useCallback(
    () => (isConnected ? disconnect() : connectWallet()),
    [connectWallet, disconnect, isConnected],
  );

  return (
    <Card p={8} spacing={6} {...props}>
      <Image src={POAPImage.src} />
      <Text fontWeight="bold" textAlign="center" fontSize="xl">
        You have unclaimed{' '}
        <Text as="span" color="ceruleanBlue">
          POAP
        </Text>{' '}
        badges!
      </Text>
      <Button
        onClick={onClick}
        isLoading={isConnecting}
        size="sm"
        fontSize="md"
        px={10}
      >
        +2
      </Button>
    </Card>
  );
};
