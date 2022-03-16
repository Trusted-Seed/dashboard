import { Heading, VStack } from '@chakra-ui/react';
import { Head } from 'components/Head';

export const HomePage: React.FC = () => {
  return (
    <VStack w="100%" p={8}>
      <Head>
        <script
          defer
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />
      </Head>
      <Heading>Join Now!</Heading>
    </VStack>
  );
};

export default HomePage;
