import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DataPoint } from 'utils/chart';
import { formatDateForPlotHint } from 'utils/formatHelpers';

type HintProps = {
  value: DataPoint;
};

export const ChartHint: React.FC<HintProps> = ({ value: { x, y } }) => (
  <Box
    sx={{
      '>*': {
        _focusVisible: { outline: 'none !important' },
      },
    }}
  >
    <Popover isOpen placement="right">
      <PopoverTrigger>
        <Box
          w="1rem"
          h="1rem"
          borderRadius="50%"
          bgColor="cyan.400"
          transform="translate(0.5rem,0.5rem)"
        />
      </PopoverTrigger>
      <PopoverContent border="none" bg="none" w="7rem" px={2} _focus={{}}>
        <VStack
          py={2}
          px={6}
          borderRadius="md"
          background="rgba(22, 25, 27, 0.95)"
          boxShadow="6px 4px 39px rgba(18, 186, 214, 0.2)"
          spacing={0}
        >
          <Text
            textTransform="uppercase"
            textAlign="center"
            color="text"
            fontSize="xs"
          >
            {formatDateForPlotHint(x * 1000)}
          </Text>
          <Text fontSize="sm" textAlign="center" fontWeight="bold">
            {y.toLocaleString('en-US')}
          </Text>
        </VStack>
      </PopoverContent>
    </Popover>
  </Box>
);
