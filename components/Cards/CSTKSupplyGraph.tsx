import { Box, StackProps, Text, useTheme } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { ChartHint } from 'components/ChartHint';
import { useTokenSnapshotsQuery } from 'graphql/autogen/types';
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
import { config } from 'web3';

export const CSTKSupplyGraphCard: React.FC<StackProps> = props => {
  const [hoveredNode, setHoveredNode] = useState<DataPoint | null>(null);
  const [{ data }] = useTokenSnapshotsQuery({
    variables: { address: config.CSTK.address },
  });
  const snapshots: DataPoint[] = useMemo(
    () =>
      data?.tokenSnapshots.map(({ timestamp, totalSupply }) => ({
        x: timestamp,
        y: Number(totalSupply),
      })) ?? [],
    [data],
  );
  const { colors } = useTheme();

  return (
    <Card
      p={8}
      align="flex-start"
      onMouseLeave={() => setHoveredNode(null)}
      {...props}
    >
      <Text
        fontSize={{ base: 'md', lg: 'lg' }}
        display="inline-block"
        whiteSpace="nowrap"
      >
        Total CSTK Supply
      </Text>
      <FlexibleWidthXYPlot height={420}>
        <HorizontalGridLines
          tickTotal={6}
          style={{ stroke: colors.whiteAlpha[200] }}
        />
        <GradientDefs>
          <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F3B34E" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#12BAD6" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="CoolGradient2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F3B34E" stopOpacity={1} />
            <stop offset="50%" stopColor="#F3B34E" stopOpacity={1} />
            <stop offset="100%" stopColor="#12BAD6" stopOpacity={1} />
          </linearGradient>
        </GradientDefs>
        <AreaSeries
          data={snapshots}
          fill="url(#CoolGradient)"
          style={{ strokeWidth: 0 }}
        />
        <LineSeries
          data={snapshots}
          stroke="url(#CoolGradient2)"
          strokeWidth={4}
          fill="none"
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
    </Card>
  );
};
