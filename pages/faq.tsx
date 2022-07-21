import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  useSafeLayoutEffect,
  VStack,
} from '@chakra-ui/react';
import FAQBGImage from 'assets/faq-bg.svg';
import { Button } from 'components/Button';
import { AccordionDownIcon } from 'components/icons/AccordionDownIcon';
import { AccordionUpIcon } from 'components/icons/AccordionUpIcon';
import { Link } from 'components/Link';
import { usePageAttributes } from 'hooks/usePageAttributes';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type FAQ = {
  question: string;
  answer: string;
};

type FAQContentAttributes = {
  title: string;
  discordUrl: string;
  date: Date;
  membershipFAQ: FAQ[];
  scoreFAQ: FAQ[];
};

const getQuestionNumberFromURL = (
  url: string,
  label: string,
): number | undefined => {
  const hash = url.split('#')[1];
  if (!hash) return;
  const urlLabel = hash.split('-')[0];
  if (urlLabel !== label) return;
  const questionNum = Number(hash.split('q')[1]);
  if (Number.isNaN(questionNum) || questionNum <= 0) return;
  return questionNum;
};

const FAQSection: React.FC<{ faqs: FAQ[]; label: string }> = ({
  faqs,
  label,
}) => {
  const [index, setIndex] = useState(0);

  const { asPath } = useRouter();

  useSafeLayoutEffect(() => {
    const questionNum = getQuestionNumberFromURL(asPath, label);
    if (questionNum) {
      setIndex(questionNum - 1);
    }
  }, [asPath, label]);

  useSafeLayoutEffect(() => {
    const listener = (event: HashChangeEvent) => {
      const questionNum = getQuestionNumberFromURL(event.newURL, label);
      if (questionNum) {
        setIndex(questionNum - 1);
      }
    };
    window.addEventListener('hashchange', listener);
    return () => {
      window.removeEventListener('hashchange', listener);
    };
  }, [label]);
  return (
    <Accordion w="100%" maxW="3xl" allowToggle border="none" index={index}>
      {faqs.map((faq, k) => (
        <AccordionItem key={k} border="none" my={4}>
          {({ isExpanded }) => (
            <Box
              onFocus={() => setIndex(k)}
              id={`${label}-q${k + 1}`}
              position="relative"
              role="group"
              px="2rem"
            >
              <Link
                href={`#${label}-q${k + 1}`}
                color="ceruleanBlue"
                position="absolute"
                top="1rem"
                right="0rem"
                fontSize="lg"
                display="none"
                _groupHover={{ display: 'block' }}
              >
                #
              </Link>
              <AccordionButton
                _focus={{}}
                borderRadius="md"
                border="1px solid"
                borderColor="ceruleanBlue"
                bg="greyBG"
                p={4}
              >
                <Text flex="1" textAlign="left" fontWeight="bold">
                  {faq.question}
                </Text>
                <Flex fontSize="xl" color="ceruleanBlue" align="center">
                  {isExpanded ? <AccordionUpIcon /> : <AccordionDownIcon />}
                </Flex>
              </AccordionButton>
              <AccordionPanel
                py={4}
                px={8}
                sx={{ a: { color: 'ceruleanBlue' }, li: { ml: 4 } }}
              >
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <Link
                        color="ceruleanBlue"
                        isExternal
                        href={href?.toString() ?? '#'}
                      >
                        {children}
                      </Link>
                    ),
                  }}
                >
                  {faq.answer}
                </ReactMarkdown>
              </AccordionPanel>
            </Box>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const FAQPage: React.FC = () => {
  const { membershipFAQ, scoreFAQ, discordUrl } =
    usePageAttributes<FAQContentAttributes>('faq');

  return (
    <>
      <Flex
        _before={{
          content: '""',
          h: '200rem',
          maxH: 'calc(100% + 10rem)',
          w: '200rem',
          top: '-10rem',
          left: '50%',
          transform: 'translateX(-50%)',
          pos: 'absolute',
          bg: `url(${FAQBGImage.src})`,
          bgPos: 'center top',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack w="100%" p={8} spacing={8} zIndex={1}>
        <Text fontSize="xl" maxW="2xl" textAlign="center">
          If you have a question that is not covered here, you can reach out to
          us by email or join us for the next Trusted Seed Office Hour that
          happen every Tuesday at 12 pm EST in the{' '}
          <Link href={discordUrl} isExternal color="ceruleanBlue">
            Commons Stack Discord!
          </Link>
        </Text>
        <Link href={discordUrl} isExternal _hover={{}}>
          <Button
            variant="outline"
            letterSpacing="0.25rem"
            size="md"
            color="ceruleanBlue"
            bg="blackAlpha.500"
          >
            Go Discord
          </Button>
        </Link>
        <Text fontWeight="800" fontSize="2xl" pt={4}>
          Trusted Seed Membership
        </Text>
        <FAQSection faqs={membershipFAQ} label="membership" />
        <Text fontWeight="800" fontSize="2xl">
          TRUST Score
        </Text>
        <FAQSection faqs={scoreFAQ} label="score" />
      </VStack>
    </>
  );
};

export default FAQPage;
