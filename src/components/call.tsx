import {
  MouseEventHandler,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { useSprings, a, config } from '@react-spring/web';
// no types package
// @ts-ignore
import swap from 'lodash-move';
import clamp from 'lodash/clamp';
import { useDrag } from '@use-gesture/react';
import useMeasure from 'react-use-measure';
import { usePrevious } from 'react-use';

import useMedia from '../useMedia';

import AspectRatio from './aspect-ratio';
import Panel from './panel';
import ScreenPanel from './screen-panel';

import { PANEL_DEFAULT } from '../constants';
import { BottomThreeState, ItemsState, PanelState } from '../types';
import {
  getPanelHeight,
  getPanelWidth,
  reducer,
  rmItemArray,
  xorTwoArraysNonSymmetry,
} from '../utils';

type SpringProps = {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
  border?: string;
};

const data = [
  {
    color: 'bg-red-100',
    key: 0,
  },
  {
    color: 'bg-yellow-100',
    key: 1,
  },
  {
    color: 'bg-green-100',
    key: 2,
  },
  {
    color: 'bg-blue-100',
    key: 3,
  },
  {
    color: 'bg-indigo-100',
    key: 4,
  },
  {
    color: 'bg-purple-100',
    key: 5,
  },
  {
    color: 'bg-pink-100',
    key: 6,
  },
  {
    color: 'bg-red-100',
    key: 7,
  },
  {
    color: 'bg-yellow-100',
    key: 8,
  },
  {
    color: 'bg-green-100',
    key: 9,
  },
  {
    color: 'bg-blue-100',
    key: 10,
  },
  {
    color: 'bg-indigo-100',
    key: 11,
  },
  {
    color: 'bg-purple-100',
    key: 12,
  },
  {
    color: 'bg-pink-100',
    key: 13,
  },
  {
    color: 'bg-green-100',
    key: 14,
  },
];

const activeBorder = '0.25rem solid #ecc94b';

const initialState = {
  panel: PanelState.Standard,
  getPanelDimensions: () => ({
    height: 1,
    width: 1,
  }),
  getX: (i: number) => i,
  getY: (i: number) => i,
  bottomThree: [],
  items: data,
};

const Call = () => {
  const media = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2,
  );

  const [ref, { height, width }] = useMeasure();

  // const [items, set] = useState<{ color: string; key: number }[]>(data);

  const columns = Math.min(Math.ceil(Math.sqrt(data.length)), media);

  const [
    { getPanelDimensions, getX, getY, maxIndex, panel, bottomThree, items },
    dispatch,
  ] = useReducer(reducer, {
    ...initialState,
    columns,
    height,
    width,
  });

  const order = useRef<number[]>(items.map(({ key }) => key));

  const prevBottomThree = usePrevious<number[]>(bottomThree);

  useEffect(() => {
    dispatch({ type: PanelState.Standard });
    dispatch({ type: ItemsState.NumItems, numItems: items.length });
  }, []);

  useEffect(() => {
    dispatch({ type: ItemsState.Dimensions, columns, width, height });
    dispatch({ type: PanelState.Standard });
  }, [columns, width, height]);

  useEffect(() => {
    const columns = Math.min(Math.ceil(Math.sqrt(items.length)), media);
    dispatch({ type: ItemsState.Dimensions, columns, width, height });
  }, [items]);

  // TODO: handle dropout
  // useEffect(() => {
  //   dispatch({ type: ItemsState.NumItems, numItems: items.length });
  //   const xorRes = xorTwoArraysNonSymmetry(bottomThree, order.current);

  //   if (xorRes.length > 0) {
  //     xorRes.forEach(num =>
  //       dispatch({ type: BottomThreeState.Remove, removalTarget: num }),
  //     );
  //   }
  // }, [items, order.current]);

  const gridItems = useMemo(() => {
    return items.map(({ key }) => {
      const i = order.current.indexOf(key);

      const x = getX(i);

      const y = getY(i);

      const { height: panelHeight, width: panelWidth } = getPanelDimensions(i);

      return {
        x,
        y,
        width: panelWidth,
        height: panelHeight,
      };
    });
  }, [columns, width, order.current, getX, getY]);

  const [springs, setSprings] = useSprings<SpringProps>(
    items.length,
    i => ({
      ...gridItems[i],
      config: config.stiff,
    }),
    [gridItems],
  );

  useEffect(() => {
    if (bottomThree.length === 3) {
      setSprings(() => ({
        border: 'none',
      }));
      return dispatch({ type: PanelState.BottomThree });
    }
    if (bottomThree.length === 2 && prevBottomThree?.length === 3) {
      return dispatch({ type: PanelState.BottomTwo });
    }
    if (panel === PanelState.BottomThree || panel === PanelState.BottomTwo) {
      return dispatch({ type: PanelState.Standard });
    }
    // @ts-ignore
    setSprings(i => ({
      border: bottomThree.includes(i) ? activeBorder : PANEL_DEFAULT.border,
    }));
  }, [bottomThree]);

  const handleClick =
    (key: number): MouseEventHandler<HTMLDivElement> =>
    event => {
      if (event.ctrlKey || event.shiftKey) {
        if (bottomThree.includes(key)) {
          return dispatch({
            type: BottomThreeState.Remove,
            removalTarget: key,
          });
        }

        if (bottomThree.length < 3) {
          return dispatch({ type: BottomThreeState.Add, additionTarget: key });
        }
      } else if (bottomThree.length !== 3) {
        return dispatch({ type: BottomThreeState.Reset });
      }
    };

  const startedInLastRow = (i: number): boolean => items.length - columns < i;

  const dragBind = useDrag(
    ({ args: [originalIndex], down, movement: [mx, my], xy: [_, y] }) => {
      let newOrder: number[];

      const { height: panelHeight, width: panelWidth } =
        getPanelDimensions(originalIndex);

      const isLastRow = (): boolean =>
        y > (Math.floor(items.length / columns) + 0.5) * panelHeight;

      const curIndex = order.current.indexOf(originalIndex);

      const emptyLeftHandSpaceBottom = (len: number): number =>
        (width - (len % columns || columns) * panelWidth) / 2;

      const curCol = clamp(
        Math.round(
          (curIndex % columns) +
            (mx +
              // TODO: clean this up
              Number(
                isLastRow()
                  ? startedInLastRow(curIndex)
                    ? 0
                    : -emptyLeftHandSpaceBottom(items.length)
                  : startedInLastRow(curIndex)
                  ? +emptyLeftHandSpaceBottom(items.length)
                  : 0,
              )) /
              panelWidth,
        ),
        0,
        columns,
      );

      const curRow = clamp(
        Math.round(Math.floor(curIndex / columns) + my / panelHeight),
        0,
        Math.ceil(items.length / columns),
      );

      newOrder = swap(order.current, curIndex, curRow * columns + curCol);

      setSprings(i => {
        const key = items[i].key;
        return down && key === originalIndex
          ? {
              x: getX(curIndex) + mx,
              y: getY(curIndex) + my,
              zIndex: 10,
              // @ts-ignore
              immediate: n => n === 'x' || n === 'y' || n === 'zIndex',
              border: activeBorder,
            }
          : {
              x: getX(newOrder.indexOf(key)),
              y: getY(newOrder.indexOf(key)),
              ...PANEL_DEFAULT,
              border: bottomThree.includes(key)
                ? activeBorder
                : PANEL_DEFAULT.border,
            };
      });
      if (!down && newOrder) {
        order.current = newOrder;
      }
    },
  );

  const removeItem = (i: number) => () => {
    if (items.length > 1) {
      const targetIndex = order.current.indexOf(i);
      // await setSprings(i => ({
      //   to: async animate => {
      //     if (i === targetIndex) {
      //       await animate({ width: 0 });
      //     }
      //   },
      // }));
      order.current = rmItemArray(order.current, targetIndex);
      // console.log(order.current, 'removeItem first');
      // set(prev => rmItemArray(prev, i));
      dispatch({
        type: ItemsState.RemoveItem,
        removalTarget: items.indexOf(
          items?.find(({ key }) => key === i) ??
            // exception handler
            items[0],
        ),
      });
      // console.log(order.current, 'removeItem');
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col h-full min-h-screen w-screen">
      <ScreenPanel as="header" className="flex justify-center items-center">
        <span className="text-white">heading</span>
        {/* TODO: check */}
        <button
          className="ml-2 text-white"
          onClick={removeItem(items[items.length - 1].key)}
        >
          remove
        </button>
      </ScreenPanel>
      <main
        className="flex-grow flex justify-center items-center h-full w-full"
        ref={ref}
      >
        <h1 className="sr-only">Call room</h1>
        <AspectRatio
          className="w-full"
          style={{
            // minHeight: 1000,
            height: getPanelHeight(width),
            // TODO: improve
          }}
        >
          <div className="relative h-full w-full">
            {springs.map((style, index) => {
              const k = order.current.indexOf(items[index].key);

              return (
                <a.div
                  className="absolute rounded touch-none"
                  {...(panel === PanelState.Standard
                    ? dragBind(items[index].key)
                    : {})}
                  key={items[index].key}
                  // key={index}
                  style={style}
                  onClick={handleClick(items[index].key)}
                  onDoubleClick={() => {
                    if (panel === PanelState.Max && k === maxIndex) {
                      return dispatch({ type: PanelState.Standard });
                    }
                    return dispatch({
                      type: PanelState.Max,
                      newMaxIndex: k,
                    });
                  }}
                >
                  <Panel
                    displayName={`Person ${items[index].key + 1}`}
                    className={items[index].color}
                    onClick={removeItem(items[index].key)}
                  />
                </a.div>
              );
            })}
          </div>
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

export default Call;
