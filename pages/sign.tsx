import { Flex, Link, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { ExternalLinkIcon } from 'components/icons/ExternalLinkIcon';
import { usePageAttributes } from 'hooks/usePageAttributes';
import { STATUTES_URL, TERMS_AND_CONDITIONS_URL } from 'utils/constants';

export type SignContentAttributes = {
  title: string;
  description: string;
  terms: {
    title: string;
    description: string;
  };
  statutes: {
    title: string;
    description: string;
  };
};

// Dynamo, wallet address to payload
// Webhook to fetch from Dynamo and a webhook to store
// in dynamo

const SignTerms: React.FC = () => {
  const { title, description, terms, statutes } =
    usePageAttributes<SignContentAttributes>('sign');
  return (
    <Flex
      direction="column"
      maxW="46rem"
      alignItems="center"
      css={{ gap: '1.5rem' }}
    >
      <Text fontSize="3xl" color="blue.500">
        {title}
      </Text>
      <Text fontSize="3xl" alignItems="center" textAlign="center" maxW="xl">
        {description}
      </Text>
      <Text fontSize="xl" color="blue.500">
        Connect wallet to view signature details
      </Text>
      <Button>Connect Wallet</Button>
      <Flex css={{ gap: '.5rem' }}>
        <Text fontSize="xl" fontWeight="700">
          {terms.title}
        </Text>
        <Link href={TERMS_AND_CONDITIONS_URL} isExternal _hover={{}}>
          <ExternalLinkIcon color="ceruleanBlue" />
        </Link>
      </Flex>
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        {terms.description}
      </Text>

      <iframe
        src={TERMS_AND_CONDITIONS_URL}
        frameBorder="0"
        height="184"
        width="100%"
      />
      <Flex css={{ gap: '.5rem' }}>
        <Text fontSize="xl" fontWeight="700">
          {statutes.title}
        </Text>
        <Link href={STATUTES_URL} isExternal _hover={{}}>
          <ExternalLinkIcon color="ceruleanBlue" />
        </Link>
      </Flex>
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        {statutes.description}
      </Text>

      <iframe src={STATUTES_URL} frameBorder="0" height="184" width="100%" />
    </Flex>
  );
};

export default SignTerms;
