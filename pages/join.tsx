import { Flex, Image, Text } from '@chakra-ui/react';
import association from 'assets/association.svg';
import community_governance from 'assets/community-governance.svg';
import signConnectBg from 'assets/sign-connect-bg.svg';
import ticket from 'assets/ticket.svg';
import BackgroundContainer from 'components/BackgroundContainer';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { useApplication } from 'context/ApplicationContext';
import SignTerms from 'pages/sign';
import React, { useCallback } from 'react';
import { PAY_DUES_URL } from 'utils/constants';
import { useWallet } from 'web3';

// - if user is not connected show connect  button
// - if user has never applied show apply stages
// - if user has already applied show sign stages
// - if user has applied and signed show pay membership stage
// - if user has done all the above then just show a button to go to membership page
//
// 1. show membership if user has not applied
// 2. if user has applied show sign
//   - make sure all sign states are handled
// 3. If membership is signed show button that redirects to pay dues
// 4. If everything done then show button that redirects to the
//   membership page

const Membership = () => {
  return (
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
            members that hold thenon-transferable TRUST tokens,
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
        <Link href="/apply-stage-one" _hover={{}}>
          <Button>Apply for membership</Button>
        </Link>
      </Flex>
    </BackgroundContainer>
  );
};

const Dues = () => {
  return (
    <BackgroundContainer>
      <Flex justifyContent="center" w="100%">
        <Link href={PAY_DUES_URL} _hover={{}}>
          <Button>Pay dues</Button>
        </Link>
      </Flex>
    </BackgroundContainer>
  );
};

const Completed = () => {
  return (
    <BackgroundContainer>
      <Flex justifyContent="center" w="100%">
        <Link href="/membership" _hover={{}}>
          <Button>Go to Membership</Button>
        </Link>
      </Flex>
    </BackgroundContainer>
  );
};

const ConnectWallet = () => {
  return (
    <Flex
      justifyContent="center"
      _before={{
        content: '""',
        h: '200rem',
        maxH: 'calc(100% - 20rem)',
        width: '200rem',
        top: '20rem',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        pos: 'absolute',
        bg: `url(${signConnectBg.src})`,
        bgPos: 'center',
        bgRepeat: 'no-repeat',
      }}
    >
      <Link href="/membership" _hover={{}}>
        <Button>Go to Membership</Button>
      </Link>
    </Flex>
  );
};

const MembershipPage: React.FC = () => {
  const { applied, tandcSigned, statutesSigned, duesPaid } = useApplication();
  const { isConnected } = useWallet();

  // add unconnected wallet state
  const pickPage = useCallback(() => {
    if (applied && tandcSigned && statutesSigned && duesPaid) {
      return <Completed />;
    } else if (applied && tandcSigned && statutesSigned) {
      return <Dues />;
    } else if (applied && isConnected) {
      return <SignTerms />;
    } else if (!isConnected) {
      return <ConnectWallet />;
    } else {
      return <Membership />;
    }
  }, [applied, tandcSigned, statutesSigned, duesPaid, isConnected]);
  return <>{pickPage()}</>;
};

export default MembershipPage;
