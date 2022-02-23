import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Head } from 'components/Head';
import { AccordionDownIcon } from 'components/icons/AccordionDownIcon';
import { AccordionUpIcon } from 'components/icons/AccordionUpIcon';
import { Link } from 'components/Link';
import { attributes } from 'content/faq.md';
import ReactMarkdown from 'react-markdown';
import { contactInfo } from 'utils/contactInfo';

type FAQ = {
  question: string;
  answer: string;
};

type FAQContentAttributes = {
  title: string;
  date: Date;
  membershipFAQ: FAQ[];
  scoreFAQ: FAQ[];
};

const { membershipFAQ, scoreFAQ } = attributes as FAQContentAttributes;

const { url: discordLink } = contactInfo.find(
  info => info.label === 'Discord',
) ?? { url: '#' };

const FAQSection: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => (
  <Accordion w="100%" maxW="3xl" allowToggle border="none">
    {faqs.map((faq, k) => (
      <AccordionItem key={k} border="none" my={4}>
        {({ isExpanded }) => (
          <>
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
          </>
        )}
      </AccordionItem>
    ))}
  </Accordion>
);

export const FAQPage: React.FC = () => {
  return (
    <VStack w="100%" p={8} spacing={8}>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Text fontSize="xl" maxW="2xl" textAlign="center">
        If you have a question that is not covered here, you can reach out to us
        by email or join us for the next Trusted Seed Office Hour that happen
        every Tuesday at 12 pm EST in the{' '}
        <Link href={discordLink} isExternal color="ceruleanBlue">
          Commons Stack Discord!
        </Link>
      </Text>
      <Link href={discordLink} isExternal _hover={{}}>
        <Button variant="outline" letterSpacing="0.25rem" size="md">
          Go Discord
        </Button>
      </Link>
      <Text fontWeight="800" fontSize="2xl" pt={4}>
        Trusted Seed Membership
      </Text>
      <FAQSection faqs={membershipFAQ} />
      <Text fontWeight="800" fontSize="2xl">
        CSTK Score
      </Text>
      <FAQSection faqs={scoreFAQ} />
    </VStack>
  );
};

export default FAQPage;
