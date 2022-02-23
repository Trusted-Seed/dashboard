import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Davatar from '@davatar/react';
import { ConnectButton } from 'components/ConnectButton';
import React from 'react';
import { formatAddress, useENS, useWallet } from 'web3';

export const UserDisplay: React.FC = () => {
  const { address } = useWallet();
  const { ens } = useENS(address);

  const size = useBreakpointValue({ base: 32, md: 23 }) ?? 23;
  if (!address) return null;
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          px={{ base: 0, md: 3 }}
          size="lg"
          borderRadius="full"
          variant="ghost"
          bg="blackAlpha.500"
          _hover={{ bg: 'whiteAlpha.50' }}
          _focus={{}}
        >
          <Box
            borderRadius="50%"
            border="1px solid transparent"
            bg="linear-gradient(#09090A, #09090A) padding-box,linear-gradient(90deg, #F3B34E 21.99%, #12BAD6 98.11%) border-box"
            p="2px"
            mr={{ base: 0, md: 3 }}
          >
            <Davatar
              address={address}
              size={size}
              generatedAvatarType="jazzicon"
            />
          </Box>
          <Text
            fontWeight="normal"
            fontSize="normal"
            display={{ base: 'none', md: 'block' }}
          >
            {formatAddress(address, ens)}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        border="none"
        bg="transparent"
        right={0}
        p="0"
        _focus={{}}
      >
        <PopoverBody p={0}>
          <Flex w="100%" justify="flex-end">
            <ConnectButton />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
