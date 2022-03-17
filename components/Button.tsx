import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export const Button: React.FC<ChakraButtonProps> = ({ children, ...props }) => (
  <ChakraButton
    bg="ceruleanBlue"
    borderColor="ceruleanBlue"
    borderWidth="2px"
    borderRadius="full"
    fontWeight="500"
    color="black"
    transition="all 0.25s"
    pos="relative"
    px={6}
    zIndex="1"
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
      bg: 'none',
      _before: {
        opacity: 1,
      },
    }}
    _focus={{
      borderColor: 'white',
    }}
    {...props}
  >
    {children}
  </ChakraButton>
);
