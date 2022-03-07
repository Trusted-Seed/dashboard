import { HStack, Text, TextProps } from '@chakra-ui/react';
import Image from 'next/image';
import { NETWORK_INFO } from 'web3';

export const NetworkLabel: React.FC<{ chainId: string } & TextProps> = ({
  chainId,
  ...props
}) => {
  const networkInfo = NETWORK_INFO[chainId];
  if (!networkInfo) return null;
  const { image, label } = networkInfo;
  return (
    <HStack>
      <Image src={image} />
      <Text as="span" fontWeight="bold" {...props}>
        {label}
      </Text>
    </HStack>
  );
};
