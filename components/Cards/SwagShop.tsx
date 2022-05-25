import { Image, Link, StackProps, Text } from '@chakra-ui/react';
import ShopImage from 'assets/shop.svg';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { MembershipStatus, useApplication } from 'context/ApplicationContext';
import { useTSLOVEBalance } from 'hooks/useTSLOVEBalance';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { SWAG_SHOP_URL } from 'utils/constants';
import { useWallet } from 'web3';

type Section = {
  description: JSX.Element;
  action: string;
};

const SECTIONS: Section[] = [
  {
    description: (
      <>
        <Text as="span" color="ceruleanBlue">
          Connect Wallet
        </Text>{' '}
        to view your TSLOVE balance
      </>
    ),
    action: 'Connect Wallet',
  },
  {
    description: (
      <>
        Become a member to get{' '}
        <Text as="span" color="ceruleanBlue">
          free swag!
        </Text>
      </>
    ),
    action: 'Apply for membership',
  },
  {
    description: (
      <>
        Become a member to get{' '}
        <Text as="span" color="ceruleanBlue">
          free swag!
        </Text>
      </>
    ),
    action: 'Activate your membership now',
  },
  {
    description: (
      <>
        Great news, you have{' '}
        <Text as="span" color="ceruleanBlue">
          free
        </Text>{' '}
        swag to claim!
      </>
    ),
    action: 'Free Swag Shop',
  },

  {
    description: <>Support the Trusted Seed, buy some swag!</>,
    action: 'Paid crossbrand shop',
  },
];

export const SwagShopCard: React.FC<StackProps> = props => {
  const { isConnected, isConnecting, connectWallet } = useWallet();
  const { membershipStatus } = useApplication();

  const { fetching, balance } = useTSLOVEBalance();
  const index: number = useMemo(() => {
    if (!isConnected) {
      return 0;
    }
    switch (membershipStatus) {
      case MembershipStatus.INACTIVE_MEMBER:
      case MembershipStatus.ACTIVE_MEMBER:
        if (balance >= 45) {
          return 3;
        }
        return 4;
      case MembershipStatus.SIGNED_NOT_PAID:
      case MembershipStatus.APPROVED_NOT_SIGNED:
      case MembershipStatus.APPLIED_NOT_APPROVED:
        return 2;
      case MembershipStatus.NOT_MEMBER:
      default:
        return 1;
    }
  }, [isConnected, balance, membershipStatus]);

  const { description, action } = SECTIONS[index];

  const { push } = useRouter();

  const onClick = useCallback(() => {
    switch (index) {
      case 4:
      case 3:
        break;
      case 2:
        push(
          membershipStatus === MembershipStatus.SIGNED_NOT_PAID
            ? '/membership'
            : '/join',
        );
        break;
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
      spacing={6}
      hasDot={index === 3}
      isLoading={fetching}
      {...props}
    >
      <Image src={ShopImage.src} mb={2} />
      <Text fontWeight="bold" textAlign="center" fontSize="xl" maxW="15rem">
        {description}
      </Text>
      {membershipStatus !== MembershipStatus.APPLIED_NOT_APPROVED && (
        <>
          {index < 3 ? (
            <Button
              onClick={onClick}
              isLoading={isConnecting}
              size="sm"
              fontSize="md"
            >
              {action}
            </Button>
          ) : (
            <Link isExternal href={SWAG_SHOP_URL} _hover={{}}>
              <Button size="sm" fontSize="md">
                {action}
              </Button>
            </Link>
          )}
        </>
      )}
    </Card>
  );
};
