import { Button } from '@chakra-ui/react';
import { useWallet } from 'web3';

export const ConnectButton: React.FC = () => {
  const { connectWallet, isConnecting, isConnected, disconnect } = useWallet();
  return (
    <Button
      isLoading={isConnecting}
      onClick={isConnected ? disconnect : connectWallet}
      px={6}
      borderRadius="full"
      border="1px solid transparent"
      bg="linear-gradient(#09090A, #09090A) padding-box,linear-gradient(90deg, #F3B34E 21.99%, #12BAD6 98.11%) border-box"
      bgSize="200% 200%"
      bgPosition="50% 50%"
      transition="background-position 0.25s"
      _hover={{
        bgPosition: '100% 50%',
      }}
      _focus={{
        bgPosition: '100% 50%',
      }}
    >
      {isConnected ? 'Disconnect' : 'Connect Wallet'}
    </Button>
  );
};
