import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { LinkOpenIcon } from 'components/icons/LinkOpenIcon';
import { useApplication } from 'context/ApplicationContext';
import { ChangeEvent, useState } from 'react';
import {
  STATUTES_HASH,
  STATUTES_URL,
  TERMS_AND_CONDITIONS_HASH,
  TERMS_AND_CONDITIONS_URL,
} from 'utils/constants';
import { useWallet } from 'web3';

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

const SignTerms: React.FC = () => {
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
      <SignIndicator signatureDate={tandcSignatureDate} />
      <iframe
        src={TERMS_AND_CONDITIONS_URL}
        frameBorder="0"
        height="184"
        width="100%"
      ></iframe>
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

export default SignTerms;
