import { Flex, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { LinkOpenIcon } from 'components/icons/LinkOpenIcon';
import React from 'react';

const SignTerms: React.FC = () => {
  return (
    <Flex
      direction="column"
      maxW="46rem"
      alignItems="center"
      css={{ gap: '1.5rem' }}
    >
      <Text fontSize="3xl" color="blue.500">
        Sign
      </Text>
      <Text fontSize="3xl" alignItems="center" textAlign="center">
        <Text>Lorem ipsum dolor sit amet, consectetur </Text>
        <Text>adipiscing elit. Aliquam sed sit eget lectus.</Text>
        <Text>Libero dictum mattis quis tincidunt risus.</Text>
      </Text>
      <Text fontSize="xl" color="blue.500">
        Connect wallet to view signature details
      </Text>
      <Button>Connect Wallet</Button>
      <Flex css={{ gap: '.5rem' }}>
        <Text fontSize="xl" fontWeight="700">
          Terms and Conditions
        </Text>
        <a href="https://ipfs.web3.party/ipfs/QmYDmtmDYUPR6wjukzaNytibeNnYs41s2co4tNzkUYdd5n">
          <LinkOpenIcon />
        </a>
      </Flex>
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        The Terms & Conditions apply to your membership of the Trusted
        Seed&apos;s Swiss Association. It covers planned activities, membership,
        rights & duties, membership score, risks, etc.
      </Text>

      <iframe
        src="https://ipfs.web3.party/ipfs/QmYDmtmDYUPR6wjukzaNytibeNnYs41s2co4tNzkUYdd5n"
        frameBorder="0"
        height="184"
        width="100%"
        back
      ></iframe>
      <Flex css={{ gap: '.5rem' }}>
        <Text fontSize="xl" fontWeight="700">
          Statues
        </Text>
        <a href="https://ipfs.web3.party/ipfs/QmcGNi9dcVgLJGtxJzjU2CyrrmVKkLnNPEK8JJC2a98zC5">
          <LinkOpenIcon />
        </a>
      </Flex>
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        The Statutes describe and regulate the structure and governance of the
        Trusted Seed&apos;s Swiss Association.
      </Text>

      <iframe
        src="https://ipfs.web3.party/ipfs/QmcGNi9dcVgLJGtxJzjU2CyrrmVKkLnNPEK8JJC2a98zC5"
        frameBorder="0"
        height="184"
        width="100%"
        back
      ></iframe>
    </Flex>
  );
};

export default SignTerms;
