import { Flex, HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { Link } from 'components/Link';
import { useTokenInfoQuery } from 'graphql/autogen/types';
import { useEffect, useRef } from 'react';
import { config } from 'web3';

export type MemberType = {
  name: string;
  image: string;
  description: string;
};

const NUMBER_MEMBERS_IN_VIEW = 6;

export const MembersListCard: React.FC<
  StackProps & { members: MemberType[] }
> = ({ members, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const child = ref.current.children[0];
      const height = child.clientHeight;
      ref.current.style.height = `calc(${
        (height * NUMBER_MEMBERS_IN_VIEW) / 16
      }rem + ${(NUMBER_MEMBERS_IN_VIEW - 1) * 0.75}rem)`;
    }
  }, []);
  const [{ data }] = useTokenInfoQuery({
    variables: { address: config.TRUST.address },
  });

  const totalMembers = Number(data?.token?.numMembers ?? 0);
  return (
    <Card p={8} align="flex-start" justify="space-between" {...props}>
      <Text
        fontSize={{ base: 'md', lg: 'lg' }}
        display="inline-block"
        whiteSpace="nowrap"
      >
        Trusted Seed Members
      </Text>
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
        <Link href="/members" _hover={{}} w="100%" role="group">
          <HStack w="100%" spacing={2}>
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
                bg="ceruleanBlue"
                borderRadius="50%"
                w="100%"
                h="100%"
                color="cardBG"
                justify="center"
                align="center"
                fontSize="sm"
                fontWeight="bold"
                transition="all 0.25s"
                overflow="hidden"
                zIndex="0"
                pos="relative"
                _before={{
                  content: '""',
                  h: '100%',
                  w: '100%',
                  pos: 'absolute',
                  zIndex: -1,
                  borderRadius: '50%',
                  bg: 'linear-gradient(270deg, #1BDD9D 0%, #2CC9CC 100%)',
                  opacity: 0,
                  transition: 'all 0.25s',
                }}
                _groupHover={{
                  color: 'white',
                  _before: {
                    opacity: 1,
                  },
                }}
              >
                +{totalMembers - members.length}
              </Flex>
            </Flex>
            <Text
              color="ceruleanBlue"
              transition="all 0.25s"
              _groupHover={{ color: 'white' }}
            >
              View full members list
            </Text>
          </HStack>
        </Link>
      </VStack>
    </Card>
  );
};
