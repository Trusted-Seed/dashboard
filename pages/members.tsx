import {
  Divider,
  Flex,
  SimpleGrid,
  SimpleGridProps,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import MembersBGImage from 'assets/members-bg.svg';
import { MemberCountCard } from 'components/Cards/MemberCount';
import { attributes } from 'content/members.md';
import { useTokenInfoQuery } from 'graphql/autogen/types';
import { formatDate } from 'utils/dateHelpers';
import { config } from 'web3';

type MembersContentAttributes = {
  description: string;
  date: string;
  firstMembers: string[];
  secondMembers: string[];
  thirdMembers: string[];
};

const { description, date, firstMembers, secondMembers, thirdMembers } =
  attributes as MembersContentAttributes;

export const MembersPage: React.FC = () => {
  const titleFontSize = { base: '5xl', lg: '6xl', xl: '7xl' };
  const titleLineHeight = { base: '4rem', lg: '5rem' };
  const descFontSize = { base: 'lg', lg: 'xl' };
  const [{ fetching, data }] = useTokenInfoQuery({
    variables: { address: config.CSTK.address },
  });

  // const totalMembers = data?.token?.numMembers ?? 0;
  const totalCSTK = data?.token?.totalSupply ?? 0;
  return (
    <>
      <Flex
        w="100%"
        _before={{
          content: '""',
          h: '500rem',
          maxH: 'calc(100% + 80rem)',
          width: '200rem',
          top: '-80rem',
          left: '50%',
          transform: 'translateX(-50%)',
          pos: 'absolute',
          bg: `url(${MembersBGImage.src})`,
          bgPos: 'top center',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack
        w="100%"
        maxW="7xl"
        p={20}
        zIndex={1}
        align="stretch"
        spacing={16}
      >
        <Flex justify="space-between">
          <VStack align="flex-start" justify="flex-end" h="100%" pb={8}>
            <Text
              fontWeight="bold"
              fontSize={titleFontSize}
              lineHeight={titleLineHeight}
            >
              Trusted Seed
            </Text>
            <Text fontSize={titleFontSize} lineHeight={titleLineHeight}>
              Members
            </Text>
            <Text fontSize={descFontSize} color="ceruleanBlue">
              Updated {formatDate(date)}
            </Text>
          </VStack>
          <MemberCountCard isMembersPage />
        </Flex>
        <Divider borderColor="ceruleanBlue" borderBottomWidth="2px" />
        <Text fontSize={descFontSize} px={24} textAlign="center">
          {description}
        </Text>
        <Divider borderColor="ceruleanBlue" borderBottomWidth="2px" />
        <VStack w="100%" textAlign="center">
          <Text
            textTransform="uppercase"
            fontSize={descFontSize}
            letterSpacing="0.2rem"
          >
            Total Number Of CSTK
          </Text>
          <Text
            color="ceruleanBlue"
            fontWeight="bold"
            fontSize={titleFontSize}
            lineHeight={titleLineHeight}
          >
            {fetching ? <Spinner /> : totalCSTK.toLocaleString('en-US')}
          </Text>
          <VStack w="100%" spacing={16} py={16}>
            <MembersDisplay members={firstMembers} fontWeight="bold" />
            <MembersDisplay members={secondMembers} />
            <MembersDisplay members={thirdMembers} />
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

const MembersDisplay: React.FC<{ members: string[] } & SimpleGridProps> = ({
  members,
  ...props
}) => (
  <SimpleGrid
    columns={[1, 2]}
    align="flex-start"
    textAlign="left"
    w="100%"
    maxW="2xl"
    {...props}
  >
    {members.map(member => (
      <Text key={member}>{member} </Text>
    ))}
  </SimpleGrid>
);

export default MembersPage;
