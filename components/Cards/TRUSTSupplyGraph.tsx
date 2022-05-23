import {
  Box,
  Flex,
  Select,
  Spinner,
  StackProps,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { ChartHint } from 'components/ChartHint';
import {
  useMemberSnapshotsQuery,
  useTokenSnapshotsQuery,
} from 'graphql/autogen/types';
import { useMemo, useState } from 'react';
import {
  AreaSeries,
  Crosshair,
  FlexibleWidthXYPlot,
  GradientDefs,
  Hint,
  HorizontalGridLines,
  LineSeries,
  MarkSeries,
  XAxis,
  YAxis,
} from 'react-vis';
import { DataPoint } from 'utils/chart';
import {
  formatDateForPlot as formatDate,
  formatNumberForPlot as formatNumber,
} from 'utils/formatHelpers';
import { config, useWallet } from 'web3';

export const TRUSTSupplyGraphCard: React.FC<StackProps> = props => {
  const { colors } = useTheme();
  const { address, isConnected } = useWallet();

  const [view, setView] = useState<string>('total');
  const [hoveredNode, setHoveredNode] = useState<DataPoint | null>(null);

  const [{ fetching: fetchingTotalSnapshots, data: totalData }] =
    useTokenSnapshotsQuery({
      variables: { address: config.TRUST.address },
    });
  const totalSnapshots: DataPoint[] = useMemo(
    () =>
      totalData?.tokenSnapshots.map(({ timestamp, totalSupply }) => ({
        x: timestamp,
        y: Number(totalSupply),
      })) ?? [],
    [totalData],
  );

  const [{ fetching: fetchingMemberSnapshots, data: memberData }] =
    useMemberSnapshotsQuery({
      variables: { address: address?.toLowerCase() ?? '' },
      pause: !isConnected,
    });
  const memberSnapshots: DataPoint[] = useMemo(
    () =>
      memberData?.memberSnapshots.map(({ timestamp, balance }) => ({
        x: timestamp,
        y: Number(balance),
      })) ?? [],
    [memberData],
  );

  const fetching = useMemo(
    () => fetchingMemberSnapshots || fetchingTotalSnapshots,
    [fetchingTotalSnapshots, fetchingMemberSnapshots],
  );
  const snapshots = useMemo(
    () =>
      isConnected && view === 'member' && memberSnapshots.length > 0
        ? memberSnapshots
        : totalSnapshots,
    [isConnected, view, totalSnapshots, memberSnapshots],
  );

  return (
    <Card p={8} align="flex-start" {...props}>
      {isConnected && memberSnapshots.length > 0 ? (
        <Flex>
          <Select
            defaultValue="total"
            value={view}
            onChange={e => setView(e.target.value)}
            border="2px solid"
            borderColor="ceruleanBlue"
            borderRadius="full"
            _hover={{}}
            _focus={{}}
            fontSize={{ base: 'md', lg: 'lg' }}
            sx={{ '>option': { bg: 'cardBG' } }}
          >
            <option value="member" label="My $TRUST" />
            <option value="total" label="$TRUST - Total Supply" />
          </Select>
        </Flex>
      ) : (
        <Text
          fontSize={{ base: 'md', lg: 'lg' }}
          display="inline-block"
          whiteSpace="nowrap"
        >
          $TRUST - Total Supply
        </Text>
      )}
      {fetching ? (
        <Flex
          w="100%"
          h={420}
          justify="center"
          align="center"
          color="ceruleanBlue"
        >
          <Spinner size="xl" thickness="4px" speed="0.65s" mb={8} />
        </Flex>
      ) : (
        <FlexibleWidthXYPlot
          height={420}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <HorizontalGridLines
            tickTotal={6}
            style={{ stroke: colors.whiteAlpha[200] }}
          />
          <GradientDefs>
            <linearGradient id="area-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F3B34E" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#12BAD6" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="line-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F3B34E" stopOpacity={1} />
              <stop offset="50%" stopColor="#F3B34E" stopOpacity={1} />
              <stop offset="100%" stopColor="#12BAD6" stopOpacity={1} />
            </linearGradient>
          </GradientDefs>
          <AreaSeries
            data={snapshots}
            fill="url(#area-gradient)"
            style={{ strokeWidth: 0 }}
            animation
          />
          <LineSeries
            data={snapshots}
            stroke="url(#line-gradient)"
            strokeWidth={4}
            fill="none"
            animation
          />
          <XAxis
            tickTotal={6}
            tickFormat={t => formatDate(t * 1000)}
            style={{
              line: { stroke: 'none' },
              text: { stroke: 'none', fill: colors.cyan[400] },
            }}
          />
          <YAxis
            tickTotal={6}
            tickFormat={s => formatNumber(s)}
            style={{
              line: { stroke: 'none' },
              text: { stroke: 'none', fill: colors.cyan[400] },
            }}
            left={10}
          />
          {hoveredNode && (
            <Crosshair
              values={[hoveredNode]}
              style={{
                line: {
                  background: 'none',
                  width: 0,
                  borderRight: '1px dashed',
                  borderRightColor: colors.cyan[400],
                },
              }}
            >
              <Box />
            </Crosshair>
          )}
          {hoveredNode && (
            <Hint
              value={hoveredNode}
              align={{ vertical: 'top', horizontal: 'left' }}
            >
              <ChartHint value={hoveredNode} />
            </Hint>
          )}
          <MarkSeries
            data={snapshots}
            onNearestXY={node => {
              setHoveredNode(node as DataPoint);
            }}
            opacity={0}
          />
        </FlexibleWidthXYPlot>
      )}
    </Card>
  );
};
