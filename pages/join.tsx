import { Flex, Text } from '@chakra-ui/react';
import signConnectBg from 'assets/sign-connect-bg.svg';
import { ApplyStageOne } from 'components/ApplyStageOne';
import { ApplyStageTwo } from 'components/ApplyStageTwo';
import { ApplyStageZero } from 'components/ApplyStageZero';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { SignTerms } from 'components/SignTerms';
import { useApplication } from 'context/ApplicationContext';
import React, { useCallback, useState } from 'react';
import { PAY_DUES_URL } from 'utils/constants';
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
        Pay dues to get access to your membership
      </Text>
      <Link href={PAY_DUES_URL} _hover={{}} isExternal>
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
      <Text fontSize="2xl">to join Trusted Seed</Text>
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

  const pickPage = useCallback(() => {
    if (tandcSigned && statutesSigned && duesPaid && applicationAccepted) {
      return <Completed />;
    } else if (tandcSigned && statutesSigned && applicationAccepted) {
      return <Dues />;
    } else if (isConnected && applicationAccepted) {
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
