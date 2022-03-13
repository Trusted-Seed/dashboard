import { Flex, HStack, VStack } from '@chakra-ui/react';
import DashboardBGImage from 'assets/dashboard-bg.svg';
import { Message, MessageCard } from 'components/Cards/Message';
import { attributes } from 'content/dashboard.md';

type HomeContentAttributes = {
  title: string;
  messages: Message[];
};

const { messages } = attributes as HomeContentAttributes;

export const DashboardPage: React.FC = () => {
  return (
    <>
      <Flex
        w="100%"
        h="0rem"
        _before={{
          content: '""',
          h: '200rem',
          maxH: '100%',
          width: '100%',
          top: '-30rem',
          left: '-36rem',
          pos: 'absolute',
          bg: `url(${DashboardBGImage.src})`,
          bgPos: 'top center',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack w="100%" py={8} px={24} zIndex={1} textAlign="center">
        <HStack spacing={8} w="100%">
          {messages.map((message, id) => (
            <MessageCard {...message} key={id} />
          ))}
        </HStack>
        <Flex h="100rem" />
      </VStack>
    </>
  );
};

export default DashboardPage;
