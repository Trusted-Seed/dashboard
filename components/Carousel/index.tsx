import { useMediaQuery, useTheme } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';

import { Item } from './Item';
import { Slider } from './Slider';
import { Track } from './Track';

export const Carousel: React.FC<{ gap: number; children: JSX.Element[] }> = ({
  children,
  gap,
}) => {
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [multiplier, setMultiplier] = useState(0.35);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [constraint, setConstraint] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const positions: number[] = useMemo(
    () => children.map((_, index) => -Math.abs((itemWidth + gap) * index)),
    [children, itemWidth, gap],
  );

  const { breakpoints } = useTheme();

  const [isBetweenBaseAndLg] = useMediaQuery(
    `(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.lg})`,
  );

  const [isBetweenLgAnd2xl] = useMediaQuery(
    `(min-width: ${breakpoints.lg}) and (max-width: ${breakpoints['2xl']})`,
  );

  const [isGreaterThan2xl] = useMediaQuery(
    `(min-width: ${breakpoints['2xl']})`,
  );

  useEffect(() => {
    if (isBetweenBaseAndLg) {
      setItemWidth(sliderWidth - gap);
      setMultiplier(0.65);
      setConstraint(1);
    }
    if (isBetweenLgAnd2xl) {
      setItemWidth(sliderWidth / 2 - gap);
      setMultiplier(0.5);
      setConstraint(2);
    }
    if (isGreaterThan2xl) {
      setItemWidth(sliderWidth / 3 - gap);
      setMultiplier(0.35);
      setConstraint(3);
    }
  }, [
    isBetweenBaseAndLg,
    isBetweenLgAnd2xl,
    isGreaterThan2xl,
    sliderWidth,
    gap,
  ]);

  const sliderProps = {
    setTrackIsActive,
    setSliderWidth,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
  };

  const trackProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    sliderWidth,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
    gap,
  };

  const itemProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
  };

  return (
    <Slider {...sliderProps}>
      <Track {...trackProps}>
        {children.map((child, index) => (
          <Item {...itemProps} index={index} key={index}>
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  );
};
