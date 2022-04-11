import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import Davatar from '@davatar/react';
import WrongNetworkImage from 'assets/wrong-network.svg';
import { ConnectButton } from 'components/ConnectButton';
import { DownArrowIcon } from 'components/icons/DownArrowIcon';
import { NetworkLabel } from 'components/NetworkLabel';
import { useENS } from 'hooks/useENS';
import React from 'react';
import {
  formatAddress,
  isSupportedNetwork,
  NETWORK_INFO,
  switchChainOnMetaMask,
  useWallet,
} from 'web3';

import { LinkOpenIcon } from './icons/LinkOpenIcon';

export const UserDisplay: React.FC = () => {
  const { address, chainId, isMetamask } = useWallet();
  const { ens } = useENS(address);

  if (!address || !chainId) return null;
  const isSupportedChain = isSupportedNetwork(chainId);
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        {isSupportedChain ? (
          <HStack align="center" spacing={{ base: 2, lg: 4 }}>
            <Button
              px={3}
              borderRadius="full"
              variant="ghost"
              bg="blackAlpha.500"
              _hover={{ bg: 'whiteAlpha.100' }}
              rightIcon={<DownArrowIcon boxSize={3} />}
            >
              <NetworkLabel chainId={chainId} fontWeight="normal" />
            </Button>
            <Button
              px={3}
              borderRadius="full"
              variant="ghost"
              bg="blackAlpha.500"
              _hover={{ bg: 'whiteAlpha.100' }}
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
                  size={20}
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
          </HStack>
        ) : (
          <Button px={6} fontSize="md" borderRadius="full" colorScheme="red">
            Wrong Network
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        border="none"
        bg="darkBG"
        boxShadow="6px 4px 39px -12px rgba(18, 186, 214, 0.2)"
        right={0}
        _focus={{}}
      >
        <PopoverBody>
          <VStack w="100%" p={4} spacing={4}>
            {isSupportedChain ? (
              <VStack w="100%" spacing={0} align="stretch">
                <Flex p={2} justify="space-between" align="center">
                  <NetworkLabel chainId={chainId} fontSize="xl" />
                  <Box bg="#44DE41" borderRadius="50%" h={2} w={2} />
                </Flex>
                <Tooltip label="View in Block Explorer">
                  <Link
                    w="100%"
                    href={`${NETWORK_INFO[chainId].explorer}/address/${address}`}
                    _hover={{
                      textDecor: 'none',
                    }}
                    isExternal
                  >
                    <Flex
                      w="100%"
                      p={2}
                      justify="space-between"
                      align="center"
                      borderRadius="md"
                      _hover={{ bg: 'whiteAlpha.50' }}
                    >
                      {NETWORK_INFO[chainId].explorerLabel}
                      <LinkOpenIcon />
                    </Flex>
                  </Link>
                </Tooltip>
              </VStack>
            ) : (
              <VStack w="100%" spacing={2} align="stretch">
                <HStack>
                  <Image src={WrongNetworkImage.src} h={6} w={6} />
                  <Text fontSize="xl">Wrong Network</Text>
                </HStack>
                <Text>Please switch to a supported network</Text>
              </VStack>
            )}
            <Divider borderColor="ceruleanBlue" borderBottomWidth="1px" />
            <VStack w="100%" spacing={2} align="stretch">
              <Text fontSize="lg">Supported Networks</Text>
              {Object.keys(NETWORK_INFO)
                .filter(c => c !== chainId)
                .map(c => {
                  const inner = (
                    <Flex
                      w="100%"
                      p={2}
                      as={isMetamask ? 'button' : 'div'}
                      onClick={
                        isMetamask ? () => switchChainOnMetaMask(c) : undefined
                      }
                      _hover={{ bg: 'whiteAlpha.50' }}
                      borderRadius="md"
                      key={c}
                    >
                      <NetworkLabel chainId={c} />
                    </Flex>
                  );
                  return isMetamask ? (
                    <Tooltip
                      label={`Switch to ${NETWORK_INFO[c].name}`}
                      key={c}
                    >
                      {inner}
                    </Tooltip>
                  ) : (
                    inner
                  );
                })}
            </VStack>
            <Divider borderColor="ceruleanBlue" borderBottomWidth="1px" />
            <ConnectButton />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
