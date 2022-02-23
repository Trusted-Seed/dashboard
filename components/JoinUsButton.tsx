import { Flex, FlexProps } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Link } from 'components/Link';

export const JoinUsButton: React.FC<FlexProps> = props => (
  <Flex {...props}>
    <Link href="/join" _hover={{}}>
      <Button
        variant="outline"
        px={12}
        textTransform="uppercase"
        letterSpacing="0.4rem"
      >
        Join Us
      </Button>
    </Link>
  </Flex>
);
