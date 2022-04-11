import { Flex, Text, VStack } from '@chakra-ui/react';
import MembershipBGImage from 'assets/membership-bg.svg';
import { Button } from 'components/Button';
import { MembershipDetails } from 'components/MembershipDetails';
import { useRouter } from 'next/router';
import { useWallet } from 'web3';

const MembershipPage: React.FC = () => {
  const { isConnected, connectWallet, isConnecting } = useWallet();
  const fontSize = { base: '3xl', xl: '3xl' };
  const { push } = useRouter();
  // TODO check membership status
  const isMember = true;
  return (
    <>
      <Flex
        w="100%"
        h="0"
        _before={{
          content: '""',
          h: '100vh',
          width: '100%',
          top: '50vh',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          pos: 'absolute',
          bg: `url(${MembershipBGImage.src})`,
          bgPos: 'center',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack w="100%" flex={1} zIndex={1} p={16}>
        {isConnected ? (
          <>
            {isMember ? (
              <MembershipDetails />
            ) : (
              <VStack w="100%" justify="center" h="100%" spacing={8}>
                <Text textAlign="center" fontSize={fontSize}>
                  You are not yet a member of the <br />
                  Trusted Seed
                </Text>
                <Button onClick={() => push('/apply')}>
                  Apply for membership
                </Button>
              </VStack>
            )}
          </>
        ) : (
          <VStack w="100%" justify="center" h="100%" spacing={8}>
            <Text textAlign="center" fontSize={fontSize}>
              Connect wallet <br />
              to view your details
            </Text>
            <Button onClick={connectWallet} isLoading={isConnecting}>
              Connect Wallet
            </Button>
          </VStack>
        )}
      </VStack>
    </>
  );
};

export default MembershipPage;
