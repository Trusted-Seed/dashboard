import { Image, StackProps, Text } from '@chakra-ui/react';
import ShopImage from 'assets/shop.svg';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useCSLOVEBalance } from 'hooks/useCSLOVEBalance';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
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
        to view your CSLOVE balance
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
    description: (
      <>
        Another way{' '}
        <Text as="span" color="ceruleanBlue">
          to donate
        </Text>{' '}
        is to buy swag!
      </>
    ),
    action: 'Paid crossbrand shop',
  },
];

export const SwagShopCard: React.FC<StackProps> = props => {
  const { isConnected, isConnecting, connectWallet } = useWallet();

  const { fetching, balance } = useCSLOVEBalance();
  const index: number = useMemo(() => {
    if (isConnected) {
      // TODO: Check membership and return 1 or 2
      if (balance.gte(1)) {
        return 3;
      }
      return 4;
    }
    return 0;
  }, [isConnected, balance]);

  const { description, action } = SECTIONS[index];

  const { push } = useRouter();

  const onClick = useCallback(() => {
    switch (index) {
      case 4:
      case 3:
      case 2:
      case 1:
        push('/membership');
        break;
      default:
        connectWallet();
    }
  }, [index, connectWallet, push]);

  return (
    <Card p={8} spacing={6} isLoading={fetching} {...props}>
      <Image src={ShopImage.src} mb={2} />
      <Text fontWeight="bold" textAlign="center" fontSize="xl" maxW="15rem">
        {description}
      </Text>
      <Button
        onClick={onClick}
        isLoading={isConnecting}
        size="sm"
        fontSize="md"
      >
        {action}
      </Button>
    </Card>
  );
};
