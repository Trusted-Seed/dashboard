import { Flex, Image, Text } from '@chakra-ui/react';
import association from 'assets/association.svg';
import community_governance from 'assets/community-governance.svg';
import ticket from 'assets/ticket.svg';
import BackgroundContainer from 'components/BackgroundContainer';
import { Button } from 'components/Button';

export const ApplyStageZero: React.FC<{ nextStage: () => void }> = ({
  nextStage,
}) => (
  <BackgroundContainer>
    <Flex
      justifyContent="flex-end"
      alignItems="center"
      w="100%"
      direction="column"
      css={{ gap: '4rem' }}
    >
      <Text fontSize="3xl" maxW="48rem">
        <Text textAlign="center">
          The Trusted Seed is a group of trusted community
        </Text>
        <Text textAlign="center">
          members that hold thenon-transferable $TRUST tokens,
        </Text>{' '}
        representing their reputation within the Common Stack.
      </Text>
      <Flex direction="row" css={{ gap: '9.125rem' }}>
        <Flex direction="column" maxW="15.125rem">
          <Image
            src={community_governance.src}
            alt="community governance"
            objectFit="contain"
            maxH="6.625rem"
          />
          <Text fontSize="xl" textAlign="center">
            Participation in
          </Text>
          <Text fontSize="xl">Community Governance</Text>
        </Flex>
        <Flex direction="column" maxW="15.125rem">
          <Image
            src={ticket.src}
            alt="ticket"
            objectFit="contain"
            maxH="6.625rem"
          />
          <Text fontSize="xl">Potential Access to Many</Text>
          <Text fontSize="xl" textAlign="center">
            Future Hatches
          </Text>
        </Flex>
        <Flex direction="column" maxW="15.125rem">
          <Image
            src={association.src}
            alt="community governance"
            objectFit="contain"
            maxH="6.625rem"
          />
          <Text fontSize="xl">Membership in Commons</Text>
          <Text fontSize="xl" textAlign="center">
            Stack Swiss Association
          </Text>
        </Flex>
      </Flex>
      <Button onClick={nextStage}>Apply for membership</Button>
    </Flex>
  </BackgroundContainer>
);
