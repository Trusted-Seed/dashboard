import { Image, Link, SimpleGrid } from '@chakra-ui/react';
import BadgeImage from 'assets/badge.svg';
import { DeliveryAddressInfo, usePOAPs } from 'hooks/usePOAPs';
import { POAP_CLAIM_URL } from 'utils/constants';

import { Button } from './Button';
import { Card } from './Card';

const BadgeDisplay: React.FC<DeliveryAddressInfo> = ({ claimed, poapInfo }) => (
  <Card p={8} justify="space-between">
    <Image src={BadgeImage.src} h="9rem" />
    {/*
    claimed ? (
      <Flex h="2.5rem" align="center">
        <Text>{formatDate(claimDate ?? 0)}</Text>
      </Flex>
    ) :
      */}
    {!claimed && (
      <Link
        isExternal
        href={POAP_CLAIM_URL.replace('{{POAP_SLUG}}', poapInfo.slug)}
        _hover={{}}
      >
        <Button h="2.5rem">Claim</Button>
      </Link>
    )}
  </Card>
);

export const BadgesDisplay: React.FC<{ poaps: string[] }> = ({ poaps }) => {
  const { deliveryAddressInfo: badges } = usePOAPs(poaps);
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
      minH="18rem"
      w="100%"
      gap={12}
    >
      {badges.map((badge, i) => (
        <BadgeDisplay key={i} {...badge} />
      ))}
    </SimpleGrid>
  );
};
