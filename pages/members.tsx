import {
  Divider,
  Flex,
  SimpleGrid,
  SimpleGridProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import MembersBGImage from 'assets/members-bg.svg';
import { MemberCountCard } from 'components/Cards/MemberCount';
import { attributes } from 'content/members.md';
import { Contract } from 'ethers';
import { GetStaticProps } from 'next';
import { formatDate } from 'utils/dateHelpers';
import { config, getEthersProvider } from 'web3';

type MembersContentAttributes = {
  description: string;
  date: string;
  firstMembers: string[];
  secondMembers: string[];
  thirdMembers: string[];
};

const { description, date, firstMembers, secondMembers, thirdMembers } =
  attributes as MembersContentAttributes;

export const MembersPage: React.FC<{
  totalMembers: number;
  totalCSTK: number;
}> = ({ totalMembers, totalCSTK }) => {
  const titleFontSize = { base: '5xl', lg: '6xl', xl: '7xl' };
  const titleLineHeight = { base: '4rem', lg: '5rem' };
  const descFontSize = { base: 'lg', lg: 'xl' };
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
        p={24}
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
          <MemberCountCard totalMembers={totalMembers} />
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
            {totalCSTK.toLocaleString('en-US')}
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

export const getStaticProps: GetStaticProps = async () => {
  const totalMembers =
    firstMembers.length + secondMembers.length + thirdMembers.length; // TODO: fetch from subgraph when available

  const { chainId, address, abi } = config.CSTK;

  const provider = await getEthersProvider(chainId);
  if (!provider) throw new Error(`Invalid network info for ${chainId}`);

  const cstk = new Contract(address, abi, provider);
  const totalCSTK = await cstk.totalSupply();

  return {
    props: {
      totalMembers,
      totalCSTK: totalCSTK.toNumber(),
    },
  };
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
