import { Image, StackProps, Text } from '@chakra-ui/react';
import POAPImage from 'assets/poap.svg';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useCallback } from 'react';
import { useWallet } from 'web3';

export const POAPCard: React.FC<StackProps & { poaps: string[] }> = ({
  poaps,
  ...props
}) => {
  const { isConnected, isConnecting, connectWallet, disconnect } = useWallet();

  const onClick = useCallback(
    () => (isConnected ? disconnect() : connectWallet()),
    [connectWallet, disconnect, isConnected],
  );

  // TODO: use this and fetch delivery info
  // eslint-disable-next-line no-console
  console.log({ poaps });

  return (
    <Card p={8} spacing={6} hasDot {...props}>
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
