import { Flex, VStack } from '@chakra-ui/react';
import MembershipBGImage from 'assets/membership-bg.svg';
import { MembershipDetails } from 'components/MembershipDetails';
import { usePageAttributes } from 'hooks/usePageAttributes';

type MembershipContentAttributes = {
  poaps: { id: string }[];
};

const MembershipPage: React.FC = () => {
  const { poaps } = usePageAttributes<MembershipContentAttributes>('dashboard');

  return (
    <>
      <Flex
        w="100%"
        h="0"
        _before={{
          content: '""',
          h: '100vh',
          width: '100%',
          top: '50vh',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          pos: 'absolute',
          bg: `url(${MembershipBGImage.src})`,
          bgPos: 'center',
          bgRepeat: 'no-repeat',
        }}
      />
      <VStack w="100%" flex={1} zIndex={1} p={16}>
        <MembershipDetails poaps={poaps.map(p => p.id)} />
      </VStack>
    </>
  );
};

export default MembershipPage;
