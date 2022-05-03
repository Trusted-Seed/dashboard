import {
  Divider,
  Link,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { Button } from 'components/Button';
import { useApplication } from 'context/ApplicationContext';
import { utils } from 'ethers';
import { useTokenInfoQuery } from 'graphql/autogen/types';
import {
  PAY_DUES_URL,
  STATUTES_URL,
  TERMS_AND_CONDITIONS_URL,
} from 'utils/constants';
import { formatDateForMembership } from 'utils/formatHelpers';
import { config } from 'web3';

import { BadgesDisplay } from './BadgesDisplay';
import { Card } from './Card';
import { ClockIcon } from './icons/ClockIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

const ScoreDisplay: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <VStack w={{ base: 'auto', lg: '100%' }}>
    <VStack align="stretch" minW={{ base: '16rem', lg: 'unset' }}>
      <Text
        textTransform="uppercase"
        fontSize={{ base: 'md', md: 'lg', lg: 'md', xl: 'lg' }}
        letterSpacing="0.2rem"
      >
        {title}
      </Text>
      <Text
        color="ceruleanBlue"
        fontWeight="bold"
        fontSize={{ base: '5xl', md: '6xl', lg: '5xl', xl: '6xl' }}
        lineHeight="5rem"
      >
        {value}
      </Text>
    </VStack>
  </VStack>
);

export const MembershipDetails: React.FC<{ poaps: string[] }> = ({ poaps }) => {
  const {
    member,
    applicationDate,
    signDate,
    duesPaid,
    balance,
    startDate,
    expiryDate,
  } = useApplication();

  const appDateDisplay = formatDateForMembership(applicationDate ?? new Date());
  const signDateDisplay = formatDateForMembership(signDate ?? new Date());
  const startDateDisplay = formatDateForMembership(startDate ?? new Date());
  const expiryDateDisplay = formatDateForMembership(expiryDate ?? new Date());

  const [{ data: supplyData }] = useTokenInfoQuery({
    variables: { address: config.TRUST.address },
  });

  const totalSupply = Number(supplyData?.token?.totalSupply ?? 0);
  const percentSupply = Number(
    totalSupply ? (balance * 100.0) / totalSupply : 0,
  );

  const maxScore = totalSupply;

  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <VStack w="100%" spacing={10}>
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        minH="18rem"
        w="100%"
        gap={12}
      >
        <Card p={6} pos="relative" justify="center" spacing={0} minH="18rem">
          <Text position="absolute" top={6} left={6}>
            Apply
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Application Date
            </Text>
            :{' '}
            <Text as="span" color="ceruleanBlue">
              {appDateDisplay}
            </Text>
          </Text>
          <Text> Your application is being processed </Text>
        </Card>
        <Card p={6} pos="relative" justify="center" spacing={2} minH="18rem">
          <Text position="absolute" top={6} left={6}>
            Sign
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Signed
            </Text>
            :{' '}
            <Text as="span" color="ceruleanBlue">
              {signDateDisplay}
            </Text>
          </Text>
          <VStack align="stretch" spacing={0}>
            <Link
              isExternal
              href={TERMS_AND_CONDITIONS_URL}
              _hover={{ color: 'ceruleanBlue' }}
            >
              <ExternalLinkIcon color="ceruleanBlue" mb={1} /> Terms and
              Conditions
            </Link>
            <Link
              isExternal
              href={STATUTES_URL}
              _hover={{ color: 'ceruleanBlue' }}
            >
              <ExternalLinkIcon color="ceruleanBlue" mb={1} /> Statutes
            </Link>
          </VStack>
        </Card>
        <Card
          p={6}
          pos="relative"
          justify="center"
          spacing={4}
          minH="18rem"
          display={{ base: 'none', xl: 'flex' }}
        >
          <Text position="absolute" top={6} left={6}>
            Dues
          </Text>
          <VStack spacing={0}>
            <Text>
              <Text as="span" fontWeight="bold">
                Dues paid
              </Text>
              :{' '}
              <Text as="span" color="ceruleanBlue">
                {duesPaid} DAI
              </Text>
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Payment Date:
              </Text>
              :{' '}
              <Text as="span" color="ceruleanBlue">
                {startDateDisplay}
              </Text>
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Membership Expires at
              </Text>
              :{' '}
              <Text as="span" color="ceruleanBlue">
                {expiryDateDisplay}
              </Text>
            </Text>
          </VStack>
          <Link isExternal href={PAY_DUES_URL} _hover={{}}>
            <Button>Pay additional dues</Button>
          </Link>
        </Card>
      </SimpleGrid>
      <Card
        p={6}
        pos="relative"
        justify="center"
        spacing={4}
        minH="18rem"
        display={{ base: 'flex', xl: 'none' }}
        w={{ base: '100%', lg: '50%' }}
      >
        <Text position="absolute" top={6} left={6}>
          Dues
        </Text>
        <VStack spacing={0}>
          <Text>
            <Text as="span" fontWeight="bold">
              Dues paid
            </Text>
            :{' '}
            <Text as="span" color="ceruleanBlue">
              {utils.formatUnits(duesPaid, 18)} DAI
            </Text>
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Payment Date:
            </Text>
            :{' '}
            <Text as="span" color="ceruleanBlue">
              {startDateDisplay}
            </Text>
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Membership Expires at
            </Text>
            :{' '}
            <Text as="span" color="ceruleanBlue">
              {expiryDateDisplay}
            </Text>
          </Text>
        </VStack>
        <Link isExternal href="#" _hover={{}}>
          <Button>Pay additional dues</Button>
        </Link>
      </Card>
      {member ? (
        <>
          <Divider borderColor="ceruleanBlue" borderBottomWidth="2px" />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} w="100%" gap={2}>
            {isSmallScreen ? (
              <VStack align="stretch" spacing={8}>
                <ScoreDisplay
                  title="My TRUST Score"
                  value={balance.toFixed(3)}
                />
                <ScoreDisplay
                  title="% Of Total Supply"
                  value={percentSupply.toFixed(3) + '%'}
                />
              </VStack>
            ) : (
              <>
                <ScoreDisplay
                  title="My TRUST Score"
                  value={balance.toFixed(3)}
                />
                <ScoreDisplay
                  title="% Of Total Supply"
                  value={percentSupply.toFixed(3) + '%'}
                />
              </>
            )}
            {isSmallScreen ? (
              <VStack align="stretch" spacing={8}>
                <ScoreDisplay
                  title="Total TRUST Supply"
                  value={totalSupply.toLocaleString('en-US')}
                />
                <ScoreDisplay
                  title="Max TRUST Score"
                  value={maxScore.toLocaleString('en-US')}
                />
              </VStack>
            ) : (
              <>
                <ScoreDisplay
                  title="Total TRUST Supply"
                  value={totalSupply.toLocaleString('en-US')}
                />
                <ScoreDisplay
                  title="Max TRUST Score"
                  value={maxScore.toLocaleString('en-US')}
                />
              </>
            )}
          </SimpleGrid>
          <Divider borderColor="ceruleanBlue" borderBottomWidth="2px" />
          <BadgesDisplay poaps={poaps} />
        </>
      ) : (
        <Card w="100%" color="ceruleanBlue" p={10} fontWeight="bold">
          <ClockIcon boxSize="3rem" />
          <Text> Your application is awaiting approval </Text>
        </Card>
      )}
    </VStack>
  );
};
