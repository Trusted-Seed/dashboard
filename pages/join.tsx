import { Flex, Text } from '@chakra-ui/react';
import signConnectBg from 'assets/sign-connect-bg.svg';
import { ApplyStageOne } from 'components/ApplyStageOne';
import { ApplyStageTwo } from 'components/ApplyStageTwo';
import { ApplyStageZero } from 'components/ApplyStageZero';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { SignTerms } from 'components/SignTerms';
import { MembershipStatus, useApplication } from 'context/ApplicationContext';
import React, { useCallback, useState } from 'react';
import { useWallet } from 'web3';

const Membership = () => {
  const [stage, setStage] = useState(0);
  const nextStage = () => setStage(s => (s < 2 ? (s + 1) % 3 : 2));
  switch (stage) {
    case 0:
      return <ApplyStageZero nextStage={nextStage} />;
    case 1:
      return <ApplyStageOne nextStage={nextStage} />;
    case 2:
    default:
      return <ApplyStageTwo />;
  }
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
        Activate your membership by paying the membership dues.
      </Text>
      <Link href="/membership" _hover={{}}>
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
      <Link href="/dashboard" _hover={{}}>
        <Button mt="1rem">Go dashboard</Button>
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
        Your application to become a trusted seed member is{' '}
        <Text as="span" fontWeight="bold">
          awaiting
        </Text>{' '}
        approval
      </Text>
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
      <Text fontSize="2xl">to join Trusted Seed</Text>
      <Button mt="1rem" onClick={connectWallet}>
        ConnectWallet
      </Button>
    </Flex>
  );
};

const MembershipPage: React.FC = () => {
  const { membershipStatus } = useApplication();
  const { isConnected } = useWallet();

  const pickPage = useCallback(() => {
    if (membershipStatus === MembershipStatus.ACTIVE_MEMBER) {
      return <Completed />;
    } else if (
      membershipStatus === MembershipStatus.SIGNED_NOT_PAID ||
      membershipStatus === MembershipStatus.INACTIVE_MEMBER
    ) {
      return <Dues />;
    } else if (
      isConnected &&
      membershipStatus === MembershipStatus.APPROVED_NOT_SIGNED
    ) {
      return <SignTerms />;
    } else if (
      isConnected &&
      membershipStatus === MembershipStatus.APPLIED_NOT_APPROVED
    ) {
      return <ApplicationNotApproved />;
    } else if (!isConnected) {
      return <ConnectWallet />;
    } else {
      return <Membership />;
    }
  }, [membershipStatus, isConnected]);
  return <>{pickPage()}</>;
};

export default MembershipPage;
