import { Link, Text, VStack } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { MembershipStatus, useApplication } from 'context/ApplicationContext';
import { useRouter } from 'next/router';
import { STATUTES_URL, TERMS_AND_CONDITIONS_URL } from 'utils/constants';
import { formatDate } from 'utils/formatHelpers';

import { Card } from './Card';
import { CheckIcon } from './icons/CheckIcon';
import { CrossIcon } from './icons/CrossIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

export const SignatureDetails: React.FC = () => {
  const { signDate, statutesSigned, tandcSigned, membershipStatus } =
    useApplication();

  const { push } = useRouter();

  const signDateDisplay = formatDate(signDate);

  return (
    <Card
      p={6}
      px={12}
      pos="relative"
      justify="center"
      spacing={4}
      minH="18rem"
      hasDot={membershipStatus === MembershipStatus.APPROVED_NOT_SIGNED}
    >
      <Text position="absolute" top={6} left={6}>
        Sign
      </Text>
      {membershipStatus === MembershipStatus.NOT_MEMBER && (
        <Text fontWeight="bold" textAlign="center">
          Membership in the Trusted Seed is regulated by the following documents
        </Text>
      )}
      {membershipStatus === MembershipStatus.APPLIED_NOT_APPROVED && (
        <Text fontWeight="bold">
          Once your application has been approved you can sign the below
          documents to continue the activation process
        </Text>
      )}
      {membershipStatus === MembershipStatus.APPROVED_NOT_SIGNED && (
        <Text fontWeight="bold">
          Read and sign the following documents to continue the activation
          process
        </Text>
      )}
      {[
        MembershipStatus.ACTIVE_MEMBER,
        MembershipStatus.INACTIVE_MEMBER,
        MembershipStatus.SIGNED_NOT_PAID,
      ].includes(membershipStatus) && (
        <Text>
          <Text as="span" fontWeight="bold">
            Signed
          </Text>
          :{' '}
          <Text as="span" color="ceruleanBlue">
            {signDateDisplay}
          </Text>
        </Text>
      )}
      <VStack align="stretch" spacing={0}>
        <Link
          isExternal
          href={TERMS_AND_CONDITIONS_URL}
          _hover={{ color: 'ceruleanBlue' }}
        >
          {membershipStatus === MembershipStatus.APPROVED_NOT_SIGNED ? (
            <>
              {tandcSigned ? (
                <CheckIcon color="ceruleanBlue" />
              ) : (
                <CrossIcon color="ceruleanBlue" />
              )}
            </>
          ) : (
            <ExternalLinkIcon color="ceruleanBlue" mb={1} />
          )}{' '}
          Terms and Conditions
        </Link>
        <Link isExternal href={STATUTES_URL} _hover={{ color: 'ceruleanBlue' }}>
          {membershipStatus === MembershipStatus.APPROVED_NOT_SIGNED ? (
            <>
              {statutesSigned ? (
                <CheckIcon color="ceruleanBlue" />
              ) : (
                <CrossIcon color="ceruleanBlue" />
              )}
            </>
          ) : (
            <ExternalLinkIcon color="ceruleanBlue" mb={1} />
          )}{' '}
          Statutes
        </Link>
      </VStack>
      {membershipStatus === MembershipStatus.APPROVED_NOT_SIGNED && (
        <Button onClick={() => push('/join')}>Sign</Button>
      )}
    </Card>
  );
};
