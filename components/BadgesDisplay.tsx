import { Flex, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { Poap, usePOAPs } from 'hooks/usePOAPs';
import { POAP_CLAIM_URL } from 'utils/constants';
import { formatDate } from 'utils/formatHelpers';

import { Button } from './Button';
import { Card } from './Card';

const BadgeDisplay: React.FC<Poap> = ({
  claimed,
  created_date,
  name,
  image_url,
  fancy_id,
}) => (
  <Card p={8} justify="space-between">
    <Image src={image_url} h="9rem" mb="1rem" />
    <Flex h="2.5rem" align="center">
      <Text align="center">{name}</Text>
    </Flex>

    {claimed ? (
      <Flex h="2.5rem" align="center">
        <Text align="center">{formatDate(created_date)}</Text>
      </Flex>
    ) : (
      <Link
        isExternal
        href={POAP_CLAIM_URL.replace('{{POAP_SLUG}}', fancy_id)}
        _hover={{}}
      >
        <Button h="2.5rem">Claim</Button>
      </Link>
    )}
  </Card>
);

export const BadgesDisplay: React.FC<{
  poapDeliveries: string[];
  poapIds: string[];
}> = ({ poapDeliveries, poapIds }) => {
  const { poaps } = usePOAPs(poapDeliveries, poapIds);
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
      minH="18rem"
      w="100%"
      gap={12}
    >
      {poaps.map((poap, i) => (
        <BadgeDisplay key={i} {...poap} />
      ))}
    </SimpleGrid>
  );
};
