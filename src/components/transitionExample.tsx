import { useState, useEffect, useMemo } from 'react';
import { useTransition, a, config } from '@react-spring/web';
import shuffle from 'lodash/shuffle';
import useMeasure from 'react-use-measure';
import styled from 'styled-components';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';

import useMedia from '../useMedia';

import Main from './main';
import ScreenPanel from './screen-panel';
import User from './svgs/user';
import AspectRatio from './aspect-ratio';

const fullConfig = resolveConfig(tailwindConfig);

const data = [
  {
    color: fullConfig.theme?.colors?.red[100],
    key: 'aa',
  },
  {
    color: fullConfig.theme?.colors?.yellow[100],
    key: 'bb',
  },
  {
    color: fullConfig.theme?.colors?.green[100],
    key: 'cc',
  },
  {
    color: fullConfig.theme?.colors?.blue[100],
    key: 'dd',
  },
  {
    color: fullConfig.theme?.colors?.indigo[100],
    key: 'ee',
  },
  {
    color: fullConfig.theme?.colors?.purple[100],
    key: 'ff',
  },
  {
    color: fullConfig.theme?.colors?.pink[100],
    key: 'gg',
  },
  {
    color: fullConfig.theme?.colors?.red[100],
    key: 'hh',
  },
  {
    color: fullConfig.theme?.colors?.yellow[100],
    key: 'ii',
  },
  {
    color: fullConfig.theme?.colors?.green[100],
    key: 'jj',
  },
  {
    color: fullConfig.theme?.colors?.blue[100],
    key: 'kk',
  },
  {
    color: fullConfig.theme?.colors?.indigo[100],
    key: 'll',
  },
  {
    color: fullConfig.theme?.colors?.purple[100],
    key: 'mm',
  },
  {
    color: fullConfig.theme?.colors?.pink[100],
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
    <a.div className="absolute" style={style}>
      <StyledAspectRatio className="rounded" bgColor={item.color}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto bg-gray-900 rounded-full">
          <User className="h-10 w-10" />
        </div>
      </StyledAspectRatio>
    </a.div>
  ));

  return (
    <div className="bg-gray-900 flex flex-col h-full min-h-screen w-screen">
      <ScreenPanel as="header" className="flex justify-center items-center">
        <span className="text-white">heading</span>
        <button
          className="ml-2 text-white"
          onClick={() => set(prev => prev.slice(0, prev.length - 1))}
        >
          remove
        </button>
      </ScreenPanel>
      <main
        className="flex-grow flex justify-center items-center h-full w-full"
        ref={ref}
      >
        <AspectRatio
          className="h-full w-full"
          style={{
            minHeight: Math.ceil(items.length / columns) * panelHeight,
          }}
        >
          <div className="relative h-full w-full">{fragment}</div>
        </AspectRatio>
      </main>
      <ScreenPanel
        as="footer"
        className="w-full flex justify-center items-center"
      >
        <span className="text-white">footer</span>
      </ScreenPanel>
    </div>
  );
};

export default TransitionExample;
