import { Image, StackProps, Text } from '@chakra-ui/react';
import ShopImage from 'assets/shop.svg';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useCallback, useMemo, useState } from 'react';
import { useWallet } from 'web3';

type Section = {
  description: JSX.Element;
  action: string;
};

const DISCONNECTED_SECTION: Section = {
  description: (
    <>
      <Text as="span" color="ceruleanBlue">
        Connect Wallet
      </Text>{' '}
      to view your CSLOVE balance
    </>
  ),
  action: 'Connect Wallet',
};

const SECTIONS: Section[] = [
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
  const [index, setIndex] = useState(0);

  const { description, action } = useMemo(
    () => (isConnected ? SECTIONS[index] : DISCONNECTED_SECTION),
    [index, isConnected],
  );

  const onClick = useCallback(
    () =>
      isConnected ? setIndex(i => (i + 1) % SECTIONS.length) : connectWallet(),
    [connectWallet, setIndex, isConnected],
  );

  return (
    <Card p={8} spacing={6} {...props}>
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
