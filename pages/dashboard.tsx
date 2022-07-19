import 'react-vis/dist/style.css';

import { Flex, Grid, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import DashboardBGImage from 'assets/dashboard-bg.svg';
import {
  AssociationBoardCard,
  AssociationBoardType,
} from 'components/Cards/AssociationBoard';
import { MemberCountCard } from 'components/Cards/MemberCount';
import { MembershipCard } from 'components/Cards/Membership';
import { MembersListCard, MemberType } from 'components/Cards/MembersList';
import {
  MemberSpotlightCard,
  MemberSpotlightType,
} from 'components/Cards/MemberSpotlight';
import { MessageCard, MessageType } from 'components/Cards/Message';
import { PartnershipCard, PartnershipType } from 'components/Cards/Partnership';
import { POAPCard } from 'components/Cards/POAP';
import { SocialCard, SocialType } from 'components/Cards/Social';
import { SwagShopCard } from 'components/Cards/SwagShop';
import { TRUSTScoreCard } from 'components/Cards/TRUSTScore';
import { TRUSTSupplyGraphCard } from 'components/Cards/TRUSTSupplyGraph';
import { Carousel } from 'components/Carousel';
import { Link } from 'components/Link';
import { usePageAttributes } from 'hooks/usePageAttributes';

type DashboardContentAttributes = {
  messages: MessageType[];
  spotlight: MemberSpotlightType;
  members: MemberType[];
  associationBoard: AssociationBoardType;
  social: SocialType;
  partnerships: PartnershipType[];
  poapIds: { id: string }[];
  poapDeliveries: { id: string }[];
};

export const DashboardPage: React.FC = () => {
  const {
    messages,
    spotlight,
    members,
    associationBoard,
    social,
    partnerships,
    poapIds,
    poapDeliveries,
  } = usePageAttributes<DashboardContentAttributes>('dashboard');

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
        <Stack w="100%" spacing={8} direction={{ base: 'column', lg: 'row' }}>
          <MembershipCard flexGrow={1} h="100%" />
          <Link href="/members" _hover={{}} flex={1} h="100%">
            <MemberCountCard w="100%" h="100%" />
          </Link>
        </Stack>
        <TRUSTSupplyGraphCard w="100%" />
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} w="100%">
          <TRUSTScoreCard />
          <MemberSpotlightCard {...spotlight} />
          <MembersListCard {...{ members }} />
        </SimpleGrid>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8} w="100%">
          <AssociationBoardCard {...associationBoard} />
          <SwagShopCard />
        </Grid>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} w="100%">
          <POAPCard
            poapDeliveries={poapDeliveries.map(p => p.id)}
            poapIds={poapIds.map(p => p.id)}
          />
          <SocialCard {...social} />
        </SimpleGrid>
        <Text
          textTransform="uppercase"
          fontWeight="bold"
          fontSize="xl"
          letterSpacing="1rem"
          py={2}
        >
          Partnerships
        </Text>
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} w="100%">
          {partnerships.map((p, i) => (
            <PartnershipCard key={i} {...p} />
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default DashboardPage;
