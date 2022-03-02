import { Flex, HStack } from '@chakra-ui/react';
import LogoImage from 'assets/logo-text.svg';
import { ConnectButton } from 'components/ConnectButton';
import { ActiveLink, Link } from 'components/Link';
import { UserDisplay } from 'components/UserDisplay';
import Image from 'next/image';
import { useWallet } from 'web3';

export const Header: React.FC = () => {
  const { isConnected } = useWallet();
  return (
    <HStack w="100%" justify="space-between" py={6} px={[4, 8]} zIndex={1}>
      <Link href="/">
        <Flex h="4rem">
          <Image src={LogoImage} />
        </Flex>
      </Link>
      <HStack align="center" spacing={10}>
        <ActiveLink href="/about">About</ActiveLink>
        <ActiveLink href="/join">Join</ActiveLink>
        <ActiveLink href="/apply">Join</ActiveLink>
        <ActiveLink href="/faq">FAQ</ActiveLink>
        {isConnected ? <UserDisplay /> : <ConnectButton />}
      </HStack>
    </HStack>
  );
};
