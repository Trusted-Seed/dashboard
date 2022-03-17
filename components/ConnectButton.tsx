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
      transition="all 0.25s"
      pos="relative"
      _before={{
        content: '""',
        h: 'calc(100% + 2px)',
        w: 'calc(100% + 2px)',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        pos: 'absolute',
        zIndex: -1,
        borderRadius: 'full',
        bg: 'linear-gradient(270deg, #1BDD9D 0%, #2CC9CC 100%)',
        opacity: 0,
        transition: 'all 0.25s',
      }}
      _hover={{
        borderColor: 'transparent',
        color: 'white',
        bg: 'none',
        _before: {
          opacity: 1,
        },
      }}
      _focus={{
        borderColor: 'white',
        color: 'white',
      }}
    >
      {isConnected ? 'Disconnect' : 'Connect Wallet'}
    </Button>
  );
};
