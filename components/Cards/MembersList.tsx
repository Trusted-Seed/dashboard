import {
  Flex,
  HStack,
  Stack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Link } from 'components/Link';
import { useEffect, useRef } from 'react';

export type MemberType = {
  name: string;
  image: string;
  description: string;
};

export const MembersListCard: React.FC<
  StackProps & { members: MemberType[] }
> = ({ members, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const child = ref.current.children[0];
      const height = child.clientHeight;
      ref.current.style.height = `calc(${(height * 5) / 16}rem + ${
        4 * 0.75
      }rem)`;
    }
  }, []);
  return (
    <Card p={8} align="flex-start" justify="space-between" {...props}>
      <Stack
        justify="space-between"
        w="100%"
        direction={{ base: 'row', lg: 'column', xl: 'row' }}
      >
        <Text
          fontSize={{ base: 'md', lg: 'lg' }}
          display="inline-block"
          whiteSpace="nowrap"
        >
          Trusted Seed Members
        </Text>
        <Link href="/members" _hover={{}}>
          <Button variant="outline" size="sm" color="white" bg="cardBG">
            View All
          </Button>
        </Link>
      </Stack>
      <VStack
        spacing={3}
        overflowY="auto"
        overflowX="hidden"
        w="100%"
        ref={ref}
      >
        {members.map(({ name, image, description }, index) => (
          <HStack w="100%" spacing={2} key={index}>
            <Flex
              border="1px solid"
              borderColor="ceruleanBlue"
              bg="cardBG"
              p="1px"
              borderRadius="50%"
              w="3rem"
              h="3rem"
            >
              <Flex
                bgImage={`url(${image})`}
                bgSize="cover"
                borderRadius="50%"
                w="100%"
                h="100%"
              />
            </Flex>
            <VStack align="flex-start" spacing={0}>
              <Text>{name}</Text>
              <Text fontSize="xs">{description}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Card>
  );
};
