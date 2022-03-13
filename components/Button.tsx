import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export const Button: React.FC<ChakraButtonProps> = ({
  variant,
  children,
  ...props
}) => {
  const isOutline = variant === 'outline';
  return (
    <ChakraButton
      variant={variant}
      bg={isOutline ? 'blackAlpha.500' : 'ceruleanBlue'}
      borderColor={isOutline ? 'ceruleanBlue' : 'none'}
      borderWidth={isOutline ? '2px' : 0}
      borderRadius="full"
      fontWeight="500"
      color={isOutline ? 'ceruleanBlue' : 'black'}
      _hover={{ bg: isOutline ? 'whiteAlpha.100' : 'darkCeruleanBlue' }}
      _focus={{}}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};
