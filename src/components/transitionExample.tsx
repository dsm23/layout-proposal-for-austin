import { useState, useEffect, useMemo } from 'react';
import { useTransition, a, config } from '@react-spring/web';
import shuffle from 'lodash/shuffle';
import useMeasure from 'react-use-measure';
import useMedia from '../useMedia';
import ScreenPanel from './screen-panel';
import User from './svgs/user';
import AspectRatio from './aspect-ratio';
import cn from '../utils/classnames';

const data = [
  {
    color: 'bg-red-100',
    key: 'aa',
  },
  {
    color: 'bg-yellow-100',
    key: 'bb',
  },
  {
    color: 'bg-green-100',
    key: 'cc',
  },
  {
    color: 'bg-blue-100',
    key: 'dd',
  },
  {
    color: 'bg-indigo-100',
    key: 'ee',
  },
  {
    color: 'bg-purple-100',
    key: 'ff',
  },
  {
    color: 'bg-pink-100',
    key: 'gg',
  },
  {
    color: 'bg-red-100',
    key: 'hh',
  },
  {
    color: 'bg-yellow-100',
    key: 'ii',
  },
  {
    color: 'bg-green-100',
    key: 'jj',
  },
  {
    color: 'bg-blue-100',
    key: 'kk',
  },
  {
    color: 'bg-indigo-100',
    key: 'll',
  },
  {
    color: 'bg-purple-100',
    key: 'mm',
  },
  {
    color: 'bg-pink-100',
    key: 'nn',
  },
];

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
      <AspectRatio className={cn('rounded', item.color)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto bg-gray-900 rounded-full">
          <User className="h-10 w-10" />
        </div>
      </AspectRatio>
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
