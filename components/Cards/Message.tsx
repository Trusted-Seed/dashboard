import { Button, Link, Text } from '@chakra-ui/react';
import { Card } from 'components/Card';

export type Message = {
  title: string;
  description: string;
  action: string;
  image?: string;
  url?: string;
};

export const MessageCard: React.FC<Message> = ({
  title,
  description,
  url,
  action,
}) => (
  <Card p={8} align="flex-start">
    <Text
      fontSize={{ base: 'lg', lg: 'xl' }}
      color="yellow.400"
      fontWeight="bold"
    >
      {title}
    </Text>
    <Text fontStyle="italic">{description}</Text>
    <Link isExternal href={url}>
      <Button
        colorScheme="yellow"
        borderRadius="full"
        size="sm"
        fontSize="md"
        px={10}
      >
        {action}
      </Button>
    </Link>
  </Card>
);
