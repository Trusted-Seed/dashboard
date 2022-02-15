import { Button, HStack, Text } from '@chakra-ui/react';
import Davatar from '@davatar/react';
import { formatAddress, useENS, useWallet } from 'web3';

export const ConnectWallet: React.FC = () => {
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();
  const { ens } = useENS(address);
  return (
    <HStack>
      {address && (
        <>
          <Davatar address={address} size={20} generatedAvatarType="jazzicon" />
          <Text fontWeight="bold">{formatAddress(address, ens)}</Text>
        </>
      )}
      <Button
        isLoading={isConnecting}
        onClick={isConnected ? disconnect : connectWallet}
      >
        {!isConnected && (isConnecting ? 'Connecting...' : 'Connect Wallet')}
        {isConnected && 'Disconnect'}
      </Button>
    </HStack>
  );
};
