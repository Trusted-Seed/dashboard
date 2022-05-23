import { LinkIcon } from '@chakra-ui/icons';
import { Flex, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Card } from 'components/Card';

export type MessageType = {
  title: string;
  description: string;
  action: string;
  image?: string;
  url?: string;
};

export const MessageCard: React.FC<MessageType> = ({
  title,
  description,
  url,
  image,
  action,
}) => (
  <Card p={8} align="flex-start" justify="flex-end" w="100%">
    <Text
      fontSize={{ base: 'lg', lg: 'xl' }}
      color="yellow.400"
      fontWeight="bold"
    >
      {title}
    </Text>
    <HStack spacing={4}>
      {image && (
        <Flex
          borderRadius="md"
          bgImage={`url(${image})`}
          bgSize="cover"
          bgPos="center"
          w="8rem"
          minW="8rem"
          h="8rem"
        />
      )}
      <VStack align="flex-start" maxH="8rem">
        <Text
          fontStyle="italic"
          display="-webkit-box"
          textOverflow="ellipsis"
          overflow="hidden"
          maxW="calc(100%)"
          sx={{ lineClamp: 4, WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}
        >
          {description}
        </Text>
        {url && (
          <Link isExternal href={url}>
            <HStack>
              <Flex
                bg="greyBG"
                borderRadius="50%"
                h={6}
                w={6}
                justify="center"
                align="center"
              >
                <LinkIcon maxH={3} color="yellow.400" />
              </Flex>
              <Text
                color="greyText"
                fontSize="xs"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                maxW="9rem"
              >
                {url}
              </Text>
            </HStack>
          </Link>
        )}
      </VStack>
    </HStack>
    <Link isExternal href={url} _hover={{}}>
      <Button
        colorScheme="yellow"
        borderColor="yellow.400"
        bg="yellow.400"
        size="sm"
        fontSize="md"
        px={8}
      >
        {action}
      </Button>
    </Link>
  </Card>
);
