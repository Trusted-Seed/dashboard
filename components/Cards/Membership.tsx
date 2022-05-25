import { StackProps, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { MembershipStatus, useApplication } from 'context/ApplicationContext';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDate } from 'utils/formatHelpers';
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

export const MembershipCard: React.FC<StackProps> = props => {
  const { isConnected, isConnecting, connectWallet } = useWallet();

  const { membershipStatus, startDate, expiryDate } = useApplication();

  const SECTIONS: Section[] = useMemo(
    () => [
      {
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
      },
      {
        title: 'Membership details',
        description: (
          <>
            The connected address is not in the Trusted Seed registry. If you
            have already been accepted into the Trusted Seed, please connect
            with the same Ethereum address that you used to join. If you have
            not yet applied to be a member of the Trusted Seed, you will need to
            do that first
          </>
        ),
        action: 'Apply for membership',
      },
      {
        title: 'Membership details',
        description: (
          <>
            Your application to become a trusted seed member is{' '}
            <Text as="span" fontWeight="bold">
              awaiting
            </Text>{' '}
            approval
          </>
        ),
        action: '',
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
              {formatDate(startDate ?? 0)}
            </Text>
            <br />
            Membership expires at:{' '}
            <Text as="span" fontWeight="bold">
              {formatDate(expiryDate ?? 0)}
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
              {formatDate(expiryDate ?? 0)}
            </Text>
          </>
        ),
        action: 'Activate your membership now',
      },
    ],
    [startDate, expiryDate],
  );

  const index: number = useMemo(() => {
    if (!isConnected) {
      return 0;
    }
    switch (membershipStatus) {
      case MembershipStatus.INACTIVE_MEMBER:
        return 5;
      case MembershipStatus.ACTIVE_MEMBER:
        return 4;
      case MembershipStatus.SIGNED_NOT_PAID:
      case MembershipStatus.APPROVED_NOT_SIGNED:
        return 3;
      case MembershipStatus.APPLIED_NOT_APPROVED:
        return 2;
      case MembershipStatus.NOT_MEMBER:
      default:
        return 1;
    }
  }, [isConnected, membershipStatus]);

  const { title, description, action } = SECTIONS[index];

  const { push } = useRouter();

  const onClick = useCallback(() => {
    switch (index) {
      case 5:
      case 4:
        push('/membership');
        break;
      case 3:
        push(
          membershipStatus === MembershipStatus.SIGNED_NOT_PAID
            ? '/membership'
            : '/join',
        );
        break;
      case 2:
      case 1:
        push('/join');
        break;
      case 0:
      default:
        connectWallet();
    }
  }, [index, connectWallet, push, membershipStatus]);

  return (
    <Card
      p={8}
      align="flex-start"
      justify="flex-end"
      bg="linear-gradient(180deg, #F3B34E 0%, #12BAD6 100%)"
      color="black"
      hasDot={index === 3 || index === 5}
      {...props}
    >
      <Text fontSize={{ base: '2xl', lg: '3xl' }} fontWeight="bold">
        {title}
      </Text>
      <Text>{description}</Text>
      {action && (
        <Button
          colorScheme="yellow"
          borderColor="yellow.400"
          bg="yellow.400"
          size="sm"
          fontSize="md"
          px={3}
          onClick={onClick}
          isLoading={isConnecting}
          _hover={{
            color: 'white',
            boxShadow: '0px 9px 17px rgba(3, 3, 3, 0.35)',
          }}
          _focus={{ borderColor: 'yellow.600' }}
        >
          {action}
        </Button>
      )}
    </Card>
  );
};
