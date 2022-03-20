import { Flex, Image, StackProps, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Link } from 'components/Link';

export type PartnershipType = {
  image: string;
  description: string;
  actionText: string;
  actionUrl: string;
};

export const PartnershipCard: React.FC<PartnershipType & StackProps> = ({
  image,
  description,
  actionText,
  actionUrl,
  ...props
}) => (
  <Card p={8} spacing={12} justify="space-between" {...props}>
    <Flex align="center" justify="center" w="100%" h="5rem">
      <Image src={image} maxW="15rem" />
    </Flex>
    <Text textAlign="center" fontSize="lg">
      {description}
    </Text>
    <Link href={actionUrl} _hover={{}} isExternal>
      <Button size="sm" fontSize="md">
        {actionText}
      </Button>
    </Link>
  </Card>
);
