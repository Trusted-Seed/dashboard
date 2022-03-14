import { Button, StackProps, Text } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { useCallback, useMemo, useState } from 'react';
import { useWallet } from 'web3';

export type Message = {
  title: string;
  description: string;
  action: string;
  image?: string;
  url?: string;
};

type Section = {
  title: string;
  description: JSX.Element;
  action: string;
};

const DISCONNECTED_SECTION: Section = {
  title: 'Membership details',
  description: (
    <>
      <Text as="span" fontWeight="bold">
        Connect Wallet
      </Text>{' '}
      to view your details
    </>
  ),
  action: 'Connect Wallet',
};

const SECTIONS: Section[] = [
  {
    title: 'Membership details',
    description: (
      <>
        The connected address is not in the Trusted Seed registry. If you have
        already been accepted into the Trusted Seed, please connect with the
        same Ethereum address that you used to join. If you have not yet applied
        to be a member of the Trusted Seed, you will need to do that first
      </>
    ),
    action: 'Apply for membership',
  },
  {
    title: 'Membership details',
    description: (
      <>
        Your application to become a trusted seed member has been{' '}
        <Text as="span" fontWeight="bold">
          approved
        </Text>
      </>
    ),
    action: 'Activate your membership now',
  },
  {
    title: 'Your Trusted Seed membership is active!',
    description: (
      <>
        Member since:{' '}
        <Text as="span" fontWeight="bold">
          2021-01-01
        </Text>
        <br />
        Membership expires at:{' '}
        <Text as="span" fontWeight="bold">
          2022-01-01
        </Text>
      </>
    ),
    action: 'Manage membership',
  },

  {
    title: 'Inactive member',
    description: (
      <>
        Your Trusted Seed membership has{' '}
        <Text as="span" fontWeight="bold">
          expired
        </Text>
        !<br />
        Membership expired:{' '}
        <Text as="span" fontWeight="bold">
          2021-01-01
        </Text>
      </>
    ),
    action: 'Activate your membership now',
  },
];

export const MembershipCard: React.FC<StackProps> = props => {
  const { isConnected, isConnecting, connectWallet } = useWallet();
  const [index, setIndex] = useState(0);

  const { title, description, action } = useMemo(
    () => (isConnected ? SECTIONS[index] : DISCONNECTED_SECTION),
    [index, isConnected],
  );

  const onClick = useCallback(
    () =>
      isConnected ? setIndex(i => (i + 1) % SECTIONS.length) : connectWallet(),
    [connectWallet, setIndex, isConnected],
  );

  return (
    <Card
      p={8}
      align="flex-start"
      justify="flex-end"
      bg="linear-gradient(180deg, #F3B34E 0%, #12BAD6 100%)"
      color="black"
      {...props}
    >
      <Text fontSize={{ base: '2xl', lg: '3xl' }} fontWeight="bold">
        {title}
      </Text>
      <Text>{description}</Text>
      <Button
        colorScheme="yellow"
        borderRadius="full"
        size="sm"
        fontSize="md"
        px={3}
        onClick={onClick}
        isLoading={isConnecting}
      >
        {action}
      </Button>
    </Card>
  );
};
