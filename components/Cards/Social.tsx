import { HStack, Link, StackProps, Text } from '@chakra-ui/react';
import { IconButton } from 'components/Button';
import { Card } from 'components/Card';
import { ICONS, LinkType } from 'utils/linkHelpers';

export type SocialType = {
  title: string;
  links: LinkType[];
};

export const SocialCard: React.FC<SocialType & StackProps> = ({
  title,
  links,
  ...props
}) => (
  <Card
    p={8}
    bg="darkBG"
    border="2px solid"
    borderColor="ceruleanBlue"
    justify="center"
    {...props}
  >
    <Text fontSize="xl" textAlign="center" fontWeight="bold">
      {title}
    </Text>
    <HStack spacing={4}>
      {links.map(({ label, iconType, url }, k) => (
        <Link key={k} href={url} isExternal>
          <IconButton
            fontSize="1.5rem"
            w="2.75rem"
            h="2.75rem"
            p={0}
            aria-label={label}
            color="cardBG"
            bg="ceruleanBlue"
            icon={ICONS[iconType]}
          />
        </Link>
      ))}
    </HStack>
  </Card>
);
