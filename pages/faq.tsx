import {
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { Head } from 'components/Head';
import { attributes } from 'content/faq.md';

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

export const HomePage: React.FC = () => {
  return (
    <VStack w="100%" p={8}>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Heading>FAQ</Heading>
      <UnorderedList ml={4}>
        {membershipFAQ.map((faq, k) => (
          <ListItem key={k}>
            <Text fontWeight="bold">{faq.question}</Text>
            <Text>{faq.answer}</Text>
          </ListItem>
        ))}
      </UnorderedList>
      <UnorderedList ml={4}>
        {scoreFAQ.map((faq, k) => (
          <ListItem key={k}>
            <Text fontWeight="bold">{faq.question}</Text>
            <Text>{faq.answer}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default HomePage;
