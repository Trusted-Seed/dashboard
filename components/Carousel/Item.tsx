import { Flex } from '@chakra-ui/react';
import React, { KeyboardEventHandler, useState } from 'react';

type ItemProps = {
  setTrackIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  trackIsActive: boolean;
  setActiveItem: React.Dispatch<React.SetStateAction<number>>;
  activeItem: number;
  positions: number[];
  itemWidth: number;
  constraint: number;
  gap: number;
  index: number;
};

export const Item: React.FC<ItemProps> = ({
  setTrackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  index,
  gap,
}) => {
  const [userDidTab, setUserDidTab] = useState(false);

  const handleFocus = () => setTrackIsActive(true);

  const handleBlur = () => {
    if (userDidTab) {
      index + 1 === positions.length && setTrackIsActive(false);
    }
    setUserDidTab(false);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = event =>
    event.key === 'Tab' &&
    !(activeItem === positions.length - constraint) &&
    setActiveItem(index);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event =>
    event.key === 'Tab' && setUserDidTab(true);

  return (
    <Flex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      w={`${itemWidth}px`}
      _notLast={{
        mr: `${gap}px`,
      }}
      py="4px"
    >
      {children}
    </Flex>
  );
};
