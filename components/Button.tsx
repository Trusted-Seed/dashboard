import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';

export const Button: React.FC<ChakraButtonProps> = props => (
  <ChakraButton
    bg="ceruleanBlue"
    borderColor="ceruleanBlue"
    borderWidth="2px"
    borderRadius="full"
    fontWeight="bold"
    color="black"
    transition="all 0.25s"
    pos="relative"
    px={6}
    zIndex="0"
    _before={{
      content: '""',
      h: 'calc(100% + 4px)',
      w: 'calc(100% + 4px)',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      pos: 'absolute',
      zIndex: -1,
      borderRadius: 'full',
      bg: 'linear-gradient(270deg, #1BDD9D 0%, #2CC9CC 100%)',
      opacity: 0,
      transition: 'all 0.25s',
    }}
    _hover={{
      borderColor: 'transparent',
      color: 'white',
      _before: {
        opacity: 1,
      },
    }}
    _focus={{
      borderColor: 'white',
    }}
    {...props}
  />
);

export const IconButton: React.FC<ChakraIconButtonProps> = props => (
  <ChakraIconButton
    borderRadius="50%"
    color="cardBG"
    bg="ceruleanBlue"
    pos="relative"
    transition="all 0.25s"
    zIndex={0}
    _before={{
      content: '""',
      h: '100%',
      w: '100%',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      pos: 'absolute',
      zIndex: -1,
      borderRadius: '50%',
      bg: 'linear-gradient(270deg, #1BDD9D 0%, #2CC9CC 100%)',
      opacity: 0,
      transition: 'all 0.25s',
    }}
    _hover={{
      color: 'white',
      _before: {
        opacity: 1,
      },
    }}
    {...props}
  />
);
