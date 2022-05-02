import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { LinkOpenIcon } from 'components/icons/LinkOpenIcon';
import { useApplication } from 'context/ApplicationContext.tsx';
import { ChangeEvent, useState } from 'react';
import {
  SIGNING_URL,
  STATUTES_HASH,
  STATUTES_URL,
  TERMS_AND_CONDITIONS_HASH,
  TERMS_AND_CONDITIONS_URL,
} from 'utils/constants';
import { useWallet } from 'web3';

// Dynamo, wallet address to payload
// Webhook to fetch from Dynamo and a webhook to store
// in dynamo

const SignIndicator = ({ signatureDate }: { signatureDate: string | null }) => {
  return (
    <Flex
      css={{
        background: '#000000',
        paddingTop: '9px',
        paddingBottom: '9px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Text size="xl">
        <Text as="span" size="xl" css={{ fontWeight: 700 }}>
          Status:
        </Text>{' '}
        {signatureDate && <Text>Signed - {signatureDate}</Text>}
        Not signed
      </Text>
    </Flex>
  );
};

const SignButton = ({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

const SignTerms: React.FC = () => {
  const { connectWallet, isConnected, address, provider } = useWallet();
  const { statutesSignatureDate, tandcSignatureDate } = useApplication();
  const [statueAgreed, setStatueAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const signConsent = async (message: string) => {
    const signer = provider.getSigner();
    try {
      const signature = await signer.signMessage(message);
      return signature;
    } catch (err) {
      // TODO change to toast
      console.error(err); // eslint-disable-line no-console
    }
  };

  // statutes -> one type
  // tandc -> another type
  const postSignature = async ({
    message,
    type,
    address,
  }: {
    message: string;
    type: 'statutes' | 'tandc';
    address: string;
  }) => {
    const signature = await signConsent(message);
    try {
      const resp = await fetch(SIGNING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          type,
          message,
          address,
          signature,
        }),
      });
      console.log(resp); // eslint-disable-line no-console
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  };

  const updateStatute = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e); // eslint-disable-line no-console
    setStatueAgreed(e.target.checked);
  };

  const updateTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setTermsAgreed(e.target.checked);
  };

  // if signed in
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
      {!isConnected && (
        <>
          <Text fontSize="xl" color="blue.500">
            Connect wallet to view signature details
          </Text>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </>
      )}
      <Flex css={{ gap: '.5rem' }}>
        <Text fontSize="xl" fontWeight="700">
          Terms and Conditions
        </Text>
        <a href={TERMS_AND_CONDITIONS_URL}>
          <LinkOpenIcon />
        </a>
      </Flex>
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        The Terms & Conditions apply to your membership of the Trusted
        Seed&apos;s Swiss Association. It covers planned activities, membership,
        rights & duties, membership score, risks, etc.
      </Text>
      <SignIndicator signatureDate={statutesSignatureDate} />
      <iframe
        src={TERMS_AND_CONDITIONS_URL}
        frameBorder="0"
        height="184"
        width="100%"
      ></iframe>
      <Checkbox
        id="statue"
        css={{ borderColor: '#12BAD6' }}
        onChange={updateTerms}
      >
        I agree to cryptographically sign a copy of these Terms and Conditions
        by signing its IPFS hash
      </Checkbox>
      {!statutesSignatureDate && (
        <SignButton
          text="Sign the Terms and Conditions"
          disabled={!termsAgreed}
          onClick={() =>
            postSignature({
              message: `I agree with statutes corresponding to IPFS hash ${TERMS_AND_CONDITIONS_HASH}`,
              type: 'tandc',
              address,
            })
          }
        />
      )}
      <Flex css={{ gap: '.5rem' }}>
        <Text fontSize="xl" fontWeight="700">
          Statues
        </Text>
        <a href={STATUTES_URL}>
          <LinkOpenIcon />
        </a>
      </Flex>
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        The Statutes describe and regulate the structure and governance of the
        Trusted Seed&apos;s Swiss Association.
      </Text>
      <SignIndicator signatureDate={tandcSignatureDate} />
      <iframe
        src={STATUTES_URL}
        frameBorder="0"
        height="184"
        width="100%"
      ></iframe>
      <Checkbox css={{ borderColor: '#12BAD6' }} onChange={updateStatute}>
        I agree to cryptographically sign a copy of these Statutes by signing
        its IPFS hash
      </Checkbox>
      {!tandcSignatureDate && (
        <SignButton
          text="Sign the Statues"
          disabled={!statueAgreed}
          onClick={() =>
            postSignature({
              message: `I agree with statutes corresponding to IPFS hash ${STATUTES_HASH}`,
              type: 'statutes',
              address,
            })
          }
        />
      )}
    </Flex>
  );
};

export default SignTerms;
