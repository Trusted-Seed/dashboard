import { Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { MembershipStatus, useApplication } from 'context/ApplicationContext';
import { useRouter } from 'next/router';
import { formatDate } from 'utils/formatHelpers';
import { useWallet } from 'web3';

import { Card } from './Card';

export const ApplicationDetails: React.FC = () => {
  const { applicationDate, membershipStatus, signDate } = useApplication();

  const { isConnected, connectWallet } = useWallet();

  const appDateDisplay = applicationDate
    ? formatDate(applicationDate)
    : signDate
    ? formatDate(signDate)
    : '–';

  const { push } = useRouter();

  return (
    <Card
      p={6}
      px={12}
      pos="relative"
      justify="center"
      spacing={0}
      minH="18rem"
    >
      <Text position="absolute" top={6} left={6}>
        Apply
      </Text>
      {isConnected ? (
        <>
          {membershipStatus === MembershipStatus.NOT_MEMBER ? (
            <>
              <Text fontWeight="bold" pb={4} textAlign="center">
                You are not yet a member of the Trusted Seed
              </Text>
              <Button onClick={() => push('/join')}>Apply</Button>
            </>
          ) : (
            <>
              <Text>
                <Text as="span" fontWeight="bold">
                  Application Date
                </Text>
                :{' '}
                <Text as="span" color="ceruleanBlue">
                  {appDateDisplay}
                </Text>
              </Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  Status
                </Text>
                :{' '}
                <Text as="span" color="ceruleanBlue">
                  {membershipStatus === MembershipStatus.APPLIED_NOT_APPROVED
                    ? 'Awaiting approval'
                    : 'Approved'}
                </Text>
              </Text>
            </>
          )}
        </>
      ) : (
        <>
          <Text fontWeight="bold" pb={4} textAlign="center">
            Connect wallet to view your details
          </Text>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </>
      )}
    </Card>
  );
};
