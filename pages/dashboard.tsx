import 'react-vis/dist/style.css';

import { Flex, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import DashboardBGImage from 'assets/dashboard-bg.svg';
import { CSTKScoreCard } from 'components/Cards/CSTKScore';
import { CSTKSupplyGraphCard } from 'components/Cards/CSTKSupplyGraph';
import { MemberCountCard } from 'components/Cards/MemberCount';
import { MembershipCard } from 'components/Cards/Membership';
import { MembersListCard, MemberType } from 'components/Cards/MembersList';
import {
  MemberSpotlightCard,
  MemberSpotlightType,
} from 'components/Cards/MemberSpotlight';
import { Message, MessageCard } from 'components/Cards/Message';
import { Carousel } from 'components/Carousel';
import { Link } from 'components/Link';
import { attributes } from 'content/dashboard.md';

type HomeContentAttributes = {
  messages: Message[];
  spotlight: MemberSpotlightType;
  members: MemberType[];
};

const { messages, spotlight, members } = attributes as HomeContentAttributes;

export const DashboardPage: React.FC = () => {
  return (
    <>
      <Flex
        w="100%"
        h="0rem"
        _before={{
          content: '""',
          h: '200rem',
          maxH: '100%',
          width: '100%',
          top: '-30rem',
          left: '-36rem',
          pos: 'absolute',
          bg: `url(${DashboardBGImage.src})`,
          bgPos: 'top center',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack w="100%" py={8} px={20} zIndex={1} textAlign="center" spacing={8}>
        <Flex w={{ base: '100%', xl: '85%' }} alignSelf="flex-start" mb={-2}>
          <Carousel gap={32}>
            {messages.map((message, id) => (
              <MessageCard {...message} key={id} />
            ))}
          </Carousel>
        </Flex>
        <HStack w="100%" spacing={8}>
          <MembershipCard flexGrow={1} h="100%" />
          <Link href="/members" _hover={{}} flex={1} h="100%">
            <MemberCountCard w="100%" h="100%" />
          </Link>
        </HStack>
        <CSTKSupplyGraphCard w="100%" />
        <SimpleGrid columns={3} gap={8} w="100%">
          <CSTKScoreCard />
          <MemberSpotlightCard {...spotlight} />
          <MembersListCard {...{ members }} />
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default DashboardPage;
