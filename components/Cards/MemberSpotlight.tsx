import { Flex, HStack, Link, StackProps, Text, VStack } from '@chakra-ui/react';
import { IconButton } from 'components/Button';
import { Card } from 'components/Card';
import { ICONS, LinkType } from 'utils/linkHelpers';

export type MemberSpotlightType = {
  name: string;
  image: string;
  imageLink: LinkType;
  title: string;
  quote: string;
  links: LinkType[];
};

export const MemberSpotlightCard: React.FC<
  MemberSpotlightType & StackProps
> = ({ name, image, imageLink, title, quote, links, ...props }) => {
  const { url, iconType, label } = imageLink;
  return (
    <Card p={8} align="flex-start" {...props}>
      <Text
        fontSize={{ base: 'md', lg: 'lg' }}
        display="inline-block"
        whiteSpace="nowrap"
      >
        Member Spotlight
      </Text>
      <VStack spacing={4} w="100%">
        <Flex
          justify="center"
          align="center"
          borderRadius="50%"
          p="2px"
          bg="linear-gradient(180deg, #F3B34E 43.71%, #12BAD6 100%)"
          pos="relative"
        >
          <Flex
            bg="linear-gradient(180deg, #E3FA56 0%, #D917AE 100%)"
            bgSize="cover"
            bgImage={`url(${image})`}
            boxSize="7.5rem"
            borderRadius="50%"
            border="2px solid"
            borderColor="cardBG"
          />
          <Link href={url} isExternal>
            <IconButton
              pos="absolute"
              top={2}
              right={-4}
              fontSize="1.5rem"
              w="2.75rem"
              h="2.75rem"
              p={0}
              aria-label={label}
              color="cardBG"
              bg="ceruleanBlue"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              icon={ICONS[iconType]}
            />
          </Link>
        </Flex>
        <VStack spacing={0}>
          <Text fontSize="lg" textAlign="center" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="sm" textAlign="center">
            {title}
          </Text>
        </VStack>
        <Text fontSize="lg" fontStyle="italic" textAlign="center">
          {`"${quote}"`}
        </Text>
        <HStack>
          {links.map(({ label, iconType, url }, k) => (
            <Link key={k} href={url} isExternal>
              <IconButton
                fontSize="lg"
                minW={8}
                w={8}
                h={8}
                p={0}
                aria-label={label}
                color="cardBG"
                bg="ceruleanBlue"
                icon={ICONS[iconType]}
              />
            </Link>
          ))}
        </HStack>
      </VStack>
    </Card>
  );
};
