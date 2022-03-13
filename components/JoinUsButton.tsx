import { Flex, FlexProps, useBreakpointValue } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Link } from 'components/Link';

export const JoinUsButton: React.FC<FlexProps> = props => {
  const buttonSize = useBreakpointValue({ base: 'md', xl: 'lg' });
  return (
    <Flex {...props}>
      <Link href="/join" _hover={{}}>
        <Button
          variant="outline"
          size={buttonSize}
          px={12}
          textTransform="uppercase"
          letterSpacing="0.4rem"
        >
          Join Us
        </Button>
      </Link>
    </Flex>
  );
};
