import {
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { Head } from 'components/Head';
import { attributes, react as HomeContent } from 'content/home.md';

type Seed = {
  name: string;
  description: string;
};

type HomeContentAttributes = {
  title: string;
  date: Date;
  seeds: Seed[];
};

const { seeds } = attributes as HomeContentAttributes;

export const HomePage: React.FC = () => {
  return (
    <VStack w="100%" p={8}>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Heading>Join</Heading>
      <HomeContent />
      <UnorderedList ml={4}>
        {seeds.map((seed, k) => (
          <ListItem key={k}>
            <Text fontWeight="bold">{seed.name}</Text>
            <Text>{seed.description}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default HomePage;
