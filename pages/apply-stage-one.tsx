import { Flex, Text } from '@chakra-ui/react';
import BackgroundContainer from 'components/BackgroundContainer';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import React from 'react';

const ApplyStageOnePage: React.FC = () => {
  return (
    <BackgroundContainer>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
        width="100%"
        css={{ gap: '2rem' }}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
          css={{ gap: '1rem' }}
        >
          <Text fontSize="xl" maxW="56.125rem" textAlign="center">
            <Text>
              This is an application to become a member of our Trusted Seed.
              Applicants will be
            </Text>
            <Text>
              accepted based on their alignment with the mission of Commons
              Stack. Expertise in token
            </Text>{' '}
            <Text>
              engineering, decentralized governance, or commons R&D are
              especially welcomed and will
            </Text>{' '}
            <Text>
              increase the maximum $TRUST Score applicants will be able to
              obtain.
            </Text>
          </Text>
          <Text fontSize="xl" maxW="56.125rem" textAlign="center">
            <Text>
              Acceptance to the Trusted Seed will allow you to become a member
              of the Commons Stack
            </Text>{' '}
            <Text>
              Association by paying your dues (min 450 DAI), through our Swiss
              Membership DApp.
            </Text>{' '}
          </Text>
          <Text fontSize="xl" maxW="56.125rem" textAlign="center">
            <Text>
              Members may be invited to participate in the Hatch of various
              Field Test Commons, to guide
            </Text>
            <Text>
              these communities towards success in establishing value and
              bringing this new cooperative
            </Text>
            <Text>
              economic paradigm to maturity. Early entry into these Commons
              gives members greater
            </Text>
            <Text>
              influence over initial decision making within the Commons with the
              benefit of a unique legal
            </Text>
            <Text>shield offered by our Swiss Association.</Text>
          </Text>
        </Flex>
        <Link href="/apply-stage-two" _hover={{}}>
          <Button>Start</Button>
        </Link>
      </Flex>
    </BackgroundContainer>
  );
};

export default ApplyStageOnePage;
