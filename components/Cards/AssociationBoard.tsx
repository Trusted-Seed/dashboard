import { StackProps, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Link } from 'components/Link';

export type AssociationBoardType = {
  title: string;
  description: string;
  countText: string;
  count: number;
  actionText: string;
  actionUrl: string;
};

export const AssociationBoardCard: React.FC<
  AssociationBoardType & StackProps
> = ({
  title,
  description,
  countText,
  count,
  actionText,
  actionUrl,
  ...props
}) => (
  <Card p={8} spacing={6} align="flex-start" justify="flex-end" {...props}>
    <Text
      color="ceruleanBlue"
      fontSize="4xl"
      fontWeight="bold"
      maxW="25rem"
      lineHeight="2.5rem"
    >
      {title}
    </Text>
    <Text maxW="35rem">{description}</Text>
    <Text fontSize="xl">
      {countText}:{' '}
      <Text as="span" color="yellow.400">
        {count}
      </Text>
    </Text>
    <Link href={actionUrl} _hover={{}} isExternal>
      <Button size="sm" fontSize="md">
        {actionText}
      </Button>
    </Link>
  </Card>
);
