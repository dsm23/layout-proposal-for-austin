import { useState, useEffect, useMemo } from 'react';
import { useTransition, a, config } from '@react-spring/web';
import shuffle from 'lodash/shuffle';
import useMeasure from 'react-use-measure';

import { styled, theme } from 'twin.macro';

import useMedia from '../useMedia';

import Main from './main';
import ScreenPanel from './screenPanel';
import User from './svgs/user';
import AspectRatio from './aspectRatio';

const data = [
  {
    color: theme`colors.red.100`,
    key: 'aa',
  },
  {
    color: theme`colors.yellow.100`,
    key: 'bb',
  },
  {
    color: theme`colors.green.100`,
    key: 'cc',
  },
  {
    color: theme`colors.blue.100`,
    key: 'dd',
  },
  {
    color: theme`colors.indigo.100`,
    key: 'ee',
  },
  {
    color: theme`colors.purple.100`,
    key: 'ff',
  },
  {
    color: theme`colors.pink.100`,
    key: 'gg',
  },
  {
    color: theme`colors.red.100`,
    key: 'hh',
  },
  {
    color: theme`colors.yellow.100`,
    key: 'ii',
  },
  {
    color: theme`colors.green.100`,
    key: 'jj',
  },
  {
    color: theme`colors.blue.100`,
    key: 'kk',
  },
  {
    color: theme`colors.indigo.100`,
    key: 'll',
  },
  {
    color: theme`colors.purple.100`,
    key: 'mm',
  },
  {
    color: theme`colors.pink.100`,
    key: 'nn',
  },
];

const StyledAspectRatio = styled(AspectRatio)<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
`;

const TransitionExample = () => {
  const media = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2,
  );

  const [ref, { height, width }] = useMeasure();

  const [items, set] = useState<{ color: string; key: string }[]>(data);

  const columns = Math.min(Math.ceil(Math.sqrt(items.length)), media);

  const panelWidth = width / columns;

  // aspect ratio
  const panelHeight = Math.min(
    (panelWidth * 56.25) / 100,
    height / Math.ceil(items.length / columns),
  );

  // const panelHeight = (panelWidth * 56.25) / 100;

  useEffect(() => void setInterval(() => set(shuffle), 4500), []);
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const gridItems = useMemo(() => {
    let gridItems = items.map(({ key }, i: number) => {
      const diff = (i: number) =>
        Math.min(Math.ceil(i / columns) * columns, items.length) -
        Math.floor(i / columns) * columns;

      const numHorizontal = (() => {
        if (diff(i)) {
          return diff(i);
        } else if (diff(i) === 0 && diff(i + columns) !== 0) {
          return diff(i + 1);
        } else {
          return columns;
        }
      })();

      const x =
        (width - panelWidth * numHorizontal) / 2 + (i % columns) * panelWidth;

      const y = Math.floor(i / columns) * panelHeight;
      return {
        color: items[i].color,
        x,
        y,
        width: width / columns,
        height: panelHeight,
        key,
      };
    });
    return gridItems;
  }, [columns, items, width]);
  const transition = useTransition(gridItems, {
    from: ({ x, y, width, height }) => ({ x, y, width, height }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0 },
    config: config.stiff,
    keys: (item: any) => item.key,
  });

  const fragment = transition((style, item) => (
    // @ts-ignore
    <a.div tw="absolute" style={style}>
      <StyledAspectRatio tw="rounded" bgColor={item.color}>
        <div tw="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto bg-gray-900 rounded-full">
          <User tw="h-10 w-10" />
        </div>
      </StyledAspectRatio>
    </a.div>
  ));

  return (
    <div tw="bg-gray-900 flex flex-col h-full min-h-screen w-screen">
      <ScreenPanel as="header" tw="flex justify-center items-center">
        <span tw="text-white">heading</span>
        <button
          tw="ml-2 text-white"
          onClick={() => set(prev => prev.slice(0, prev.length - 1))}
        >
          remove
        </button>
      </ScreenPanel>
      <main
        tw="flex-grow flex justify-center items-center h-full w-full"
        ref={ref}
      >
        <AspectRatio
          tw="h-full w-full"
          style={{
            minHeight: Math.ceil(items.length / columns) * panelHeight,
          }}
        >
          <div tw="relative h-full w-full">{fragment}</div>
        </AspectRatio>
      </main>
      <ScreenPanel as="footer" tw="w-full flex justify-center items-center">
        <span tw="text-white">footer</span>
      </ScreenPanel>
    </div>
  );
};

export default TransitionExample;
