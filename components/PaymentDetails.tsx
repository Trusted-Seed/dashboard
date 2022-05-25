import { Link, StackProps, Text, VStack } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { MembershipStatus, useApplication } from 'context/ApplicationContext';
import { PAY_DUES_URL } from 'utils/constants';
import { formatDate } from 'utils/formatHelpers';

import { Card } from './Card';

export const PaymentDetails: React.FC<StackProps> = props => {
  const { duesPaid, paymentDate, expiryDate, membershipStatus } =
    useApplication();

  const paymentDateDisplay = formatDate(paymentDate ?? new Date());
  const expiryDateDisplay = formatDate(expiryDate ?? new Date());

  return (
    <Card
      p={6}
      px={12}
      pos="relative"
      justify="center"
      spacing={4}
      minH="18rem"
      hasDot={
        membershipStatus === MembershipStatus.SIGNED_NOT_PAID ||
        membershipStatus === MembershipStatus.INACTIVE_MEMBER
      }
      {...props}
    >
      <Text position="absolute" top={6} left={6}>
        Dues
      </Text>
      {[
        MembershipStatus.NOT_MEMBER,
        MembershipStatus.APPLIED_NOT_APPROVED,
        MembershipStatus.APPROVED_NOT_SIGNED,
      ].includes(membershipStatus) && (
        <>
          <Text fontWeight="bold" textAlign="center">
            The Trusted Seed membership runs for one year after payment of dues.
          </Text>
          <Text textAlign="center">
            <Text as="span" fontWeight="bold">
              Annual Dues
            </Text>
            :{' '}
            <Text as="span" color="ceruleanBlue">
              450 DAI
            </Text>
          </Text>
        </>
      )}
      {[
        MembershipStatus.ACTIVE_MEMBER,
        MembershipStatus.INACTIVE_MEMBER,
        MembershipStatus.SIGNED_NOT_PAID,
      ].includes(membershipStatus) && (
        <>
          {membershipStatus === MembershipStatus.SIGNED_NOT_PAID && (
            <Text fontWeight="bold" textAlign="center">
              Activate your membership by paying the membership dues.
            </Text>
          )}
          {membershipStatus === MembershipStatus.INACTIVE_MEMBER && (
            <Text fontWeight="bold" textAlign="center">
              Your membership has expired. Pay membership dues to reactivate.
            </Text>
          )}
          <VStack spacing={0}>
            <Text>
              <Text as="span" fontWeight="bold">
                Dues paid
              </Text>
              :{' '}
              <Text as="span" color="ceruleanBlue">
                {membershipStatus === MembershipStatus.SIGNED_NOT_PAID
                  ? '-'
                  : `${duesPaid} DAI`}
              </Text>
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Payment Date
              </Text>
              :{' '}
              <Text as="span" color="ceruleanBlue">
                {membershipStatus === MembershipStatus.SIGNED_NOT_PAID
                  ? '-'
                  : paymentDateDisplay}
              </Text>
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Membership Expires at
              </Text>
              :{' '}
              <Text as="span" color="ceruleanBlue">
                {membershipStatus === MembershipStatus.SIGNED_NOT_PAID
                  ? '-'
                  : expiryDateDisplay}
              </Text>
            </Text>
          </VStack>
          <Link isExternal href={PAY_DUES_URL} _hover={{}}>
            <Button>
              Pay
              {membershipStatus === MembershipStatus.ACTIVE_MEMBER
                ? ' additional '
                : ' '}
              dues
            </Button>
          </Link>
        </>
      )}
    </Card>
  );
};
