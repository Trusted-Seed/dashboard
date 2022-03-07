import { Flex } from '@chakra-ui/react';
import LandingBGImage from 'assets/landing-bg.svg';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const BackgroundContainer: React.FC = ({ children }: Props) => {
  return (
    <Flex
      w="100%"
      h="100%"
      _before={{
        content: '""',
        h: '100rem',
        width: '100vw',
        top: '10rem',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        pos: 'absolute',
        bg: `url(${LandingBGImage.src})`,
        bgPos: 'center',
        bgRepeat: 'no-repeat',
        bgSize: 'contain',
      }}
    >
      {children}
    </Flex>
  );
};

export default BackgroundContainer;
