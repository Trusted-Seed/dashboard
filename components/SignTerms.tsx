import { Checkbox, Flex, Link, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { ExternalLinkIcon } from 'components/icons/ExternalLinkIcon';
import { useApplication } from 'context/ApplicationContext';
import { usePageAttributes } from 'hooks/usePageAttributes';
import { ChangeEvent, useState } from 'react';
import {
  STATUTES_HASH,
  STATUTES_URL,
  TERMS_AND_CONDITIONS_HASH,
  TERMS_AND_CONDITIONS_URL,
} from 'utils/constants';
import { useWallet } from 'web3';

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

const SignIndicator = ({ signatureDate }: { signatureDate: Date | null }) => {
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
        {signatureDate ? (
          <Text as="span">
            Signed - {`${signatureDate.toISOString().substring(0, 10)}`}
          </Text>
        ) : (
          'Not signed'
        )}
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

export const SignTerms: React.FC = () => {
  const { title, description, terms, statutes } =
    usePageAttributes<SignContentAttributes>('sign');
  const { connectWallet, isConnected, address } = useWallet();
  const { statutesSignatureDate, tandcSignatureDate, postSignature } =
    useApplication();
  const [statueAgreed, setStatueAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const updateStatute = (e: ChangeEvent<HTMLInputElement>) => {
    setStatueAgreed(e.target.checked);
  };

  const updateTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setTermsAgreed(e.target.checked);
  };

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
      ></iframe>
      <SignIndicator signatureDate={tandcSignatureDate} />
      {!tandcSignatureDate && (
        <>
          <Checkbox
            id="statue"
            css={{ borderColor: '#12BAD6' }}
            onChange={updateTerms}
          >
            I agree to cryptographically sign a copy of these Terms and
            Conditions by signing its IPFS hash
          </Checkbox>

          <SignButton
            text="Sign the Terms and Conditions"
            disabled={!termsAgreed}
            onClick={() => {
              if (!postSignature) {
                return;
              }

              postSignature({
                message: `I agree with Terms and Conditions corresponding to IPFS hash ${TERMS_AND_CONDITIONS_HASH}`,
                type: 'tandc',
                address: address || '',
              });
            }}
          />
        </>
      )}
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
      <SignIndicator signatureDate={statutesSignatureDate} />
      <iframe
        src={STATUTES_URL}
        frameBorder="0"
        height="184"
        width="100%"
      ></iframe>
      {!statutesSignatureDate && (
        <>
          <Checkbox css={{ borderColor: '#12BAD6' }} onChange={updateStatute}>
            I agree to cryptographically sign a copy of these Statutes by
            signing its IPFS hash
          </Checkbox>

          <SignButton
            text="Sign the Statues"
            disabled={!statueAgreed}
            onClick={() => {
              if (!postSignature) {
                return;
              }
              postSignature({
                message: `I agree with statutes corresponding to IPFS hash ${STATUTES_HASH}`,
                type: 'statutes',
                address: address || '',
              });
            }}
          />
        </>
      )}
    </Flex>
  );
};
