import { Flex, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import BadgeImage from 'assets/badge.svg';
import { formatDateForMembership } from 'utils/formatHelpers';

import { Button } from './Button';
import { Card } from './Card';

const BadgeDisplay: React.FC<{ claimed?: string }> = ({ claimed }) => (
  <Card p={8} justify="space-between">
    <Image src={BadgeImage.src} h="9rem" />
    {claimed ? (
      <Flex h="2.5rem" align="center">
        <Text>{claimed}</Text>
      </Flex>
    ) : (
      <Link isExternal href="#" _hover={{}}>
        <Button h="2.5rem">Claim</Button>
      </Link>
    )}
  </Card>
);

export const BadgesDisplay: React.FC = () => {
  const badges = [
    { claimed: formatDateForMembership(new Date()) },
    { claimed: formatDateForMembership(new Date()) },
    { claimed: formatDateForMembership(new Date()) },
    {},
    {},
  ];
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
