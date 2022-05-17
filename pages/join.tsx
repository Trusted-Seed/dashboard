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
    <Flex
      justifyContent="center"
      background={`url(${signConnectBg.src})`}
      backgroundPosition="bottom"
      bgRepeat="no-repeat"
      position="absolute"
      alignItems="center"
      direction="column"
      h="100%"
      w="100%"
    >
      <Text fontSize="2xl" textAlign="center">
        Pay dues to get access to your membership
      </Text>
      <Link href={PAY_DUES_URL} _hover={{}}>
        <Button mt="1rem">Pay dues</Button>
      </Link>
    </Flex>
  );
};

const Completed = () => {
  return (
    <Flex
      justifyContent="center"
      background={`url(${signConnectBg.src})`}
      backgroundPosition="bottom"
      bgRepeat="no-repeat"
      position="absolute"
      alignItems="center"
      direction="column"
      h="100%"
      w="100%"
    >
      <Text fontSize="2xl" textAlign="center">
        Your membership is up and running
      </Text>
      <Link href="/membership" _hover={{}}>
        <Button mt="1rem">Go to Membership</Button>
      </Link>
    </Flex>
  );
};

const ApplicationNotApproved = () => {
  return (
    <Flex
      justifyContent="center"
      background={`url(${signConnectBg.src})`}
      backgroundPosition="bottom"
      bgRepeat="no-repeat"
      position="absolute"
      alignItems="center"
      direction="column"
      h="100%"
      w="100%"
    >
      <Text fontSize="2xl" textAlign="center">
        You will be able to sign the documents once your
      </Text>
      <Text fontSize="2xl">membership application has been approved</Text>
    </Flex>
  );
};

const ConnectWallet = () => {
  const { connectWallet } = useWallet();
  return (
    <Flex
      justifyContent="center"
      background={`url(${signConnectBg.src})`}
      backgroundPosition="bottom"
      bgRepeat="no-repeat"
      position="absolute"
      alignItems="center"
      direction="column"
      h="100%"
      w="100%"
    >
      <Text fontSize="2xl" textAlign="center">
        Connect wallet
      </Text>
      <Text fontSize="2xl">to view signature details</Text>
      <Button mt="1rem" onClick={connectWallet}>
        ConnectWallet
      </Button>
    </Flex>
  );
};

const MembershipPage: React.FC = () => {
  const {
    applied,
    tandcSigned,
    statutesSigned,
    duesPaid,
    applicationAccepted,
  } = useApplication();
  const { isConnected } = useWallet();

  // add unconnected wallet state
  const pickPage = useCallback(() => {
    if (
      applied &&
      tandcSigned &&
      statutesSigned &&
      duesPaid &&
      applicationAccepted
    ) {
      return <Completed />;
    } else if (
      applied &&
      tandcSigned &&
      statutesSigned &&
      applicationAccepted
    ) {
      return <Dues />;
    } else if (applied && isConnected && applicationAccepted) {
      return <SignTerms />;
    } else if (isConnected && applied && !applicationAccepted) {
      return <ApplicationNotApproved />;
    } else if (!isConnected) {
      return <ConnectWallet />;
    } else {
      return <Membership />;
    }
  }, [
    applied,
    tandcSigned,
    statutesSigned,
    duesPaid,
    isConnected,
    applicationAccepted,
  ]);
  return <>{pickPage()}</>;
};

export default MembershipPage;
