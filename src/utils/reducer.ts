// @ts-nocheck
import { Reducer } from 'react';
import { getPanelHeight, getPanelWidth, rmItemArray } from '.';

import {
  Action,
  BottomThreeState,
  ItemsState,
  PanelState,
  State,
} from '../types';

import { xorTwoArraysNonSymmetry } from '../utils';

export const reducer: Reducer<State, Action> = (
  state: State,
  action: Action,
): State => {
  const { bottomThree, columns, height, width, items } = state;

  const minPanelWidth = width / columns;

  const numItems = items.length;

  switch (action.type) {
    case BottomThreeState.Add:
      return {
        ...state,
        bottomThree: [...bottomThree, action.additionTarget],
      };
    case BottomThreeState.Remove:
      return {
        ...state,
        bottomThree: rmItemArray(
          bottomThree,
          bottomThree.indexOf(action.removalTarget),
        ),
      };

    case BottomThreeState.Reset:
      return { ...state, bottomThree: [] };
    case ItemsState.Dimensions:
      // const resizeAction = action as ResizeAction;

      return reducer(
        {
          ...state,
          columns: action?.columns,
          width: action?.width,
          height: action?.height,
        },
        { type: state.panel },
      );

    case ItemsState.RemoveItem:
      return { ...state, items: rmItemArray(items, action.removalTarget) };
    case PanelState.Standard: {
      const getPanelDimensions = () => ({
        width: minPanelWidth,
        get height() {
          const panelHeight = getPanelHeight(this.width);
          const rows = Math.ceil(items.length / columns);

          if(panelHeight * rows > height) {
            return height / rows;
          }
          return panelHeight;
        },
      });

      const getX = (i: number) => {
        const { width: panelWidth } = getPanelDimensions(i);

        const columnsFromRight = (i: number) =>
          Math.min(Math.ceil(i / columns) * columns, numItems) -
          Math.floor(i / columns) * columns;

        const column = (() => {
          if (columnsFromRight(i)) {
            return columnsFromRight(i);
          } else if (
            columnsFromRight(i) === 0 &&
            columnsFromRight(i + columns) !== 0
          ) {
            return columnsFromRight(i + 1);
          } else {
            return columns;
          }
        })();

        const emptyLeftHandSpace = (width - panelWidth * column) / 2;

        return emptyLeftHandSpace + (i % columns) * panelWidth;
      };

      const getY = (i: number) => {
        const { height: panelHeight } = getPanelDimensions(i);
        return Math.floor(i / columns) * panelHeight;
      };

      return {
        ...state,
        panel: PanelState.Standard,
        getPanelDimensions,
        getX,
        getY,
      };
    }

    case PanelState.BottomThree: {
      const itemsWithoutBottomThree = xorTwoArraysNonSymmetry(
        items.map(({ key }) => key),
        [0, ...bottomThree],
      );

      const getPanelDimensions = (i: number) => {
        if (i === 0 || bottomThree.includes(items[i].key)) {
          return {
            height: height / 3,
            get width() {
              return getPanelWidth(this.height);
            },
          };
        }

        const smallerPanelWidth = (width * 2) / 3 / columns;
        const potentialRows = Math.ceil(itemsWithoutBottomThree.length / columns);

        const totalSmallPanelHeights =
          Math.ceil(itemsWithoutBottomThree.length / columns) *
          getPanelHeight(smallerPanelWidth);

        if (totalSmallPanelHeights > height / 3) {
          return {
            height: (height / 3) / potentialRows,
            get width() {
              return getPanelWidth(this.height);
            },
          };
        }
        return {
          width: smallerPanelWidth,
          get height() {
            return getPanelHeight(this.width);
          },
        };
      };

      const getX = (i: number) => {
        const { width: panelWidth } = getPanelDimensions(i);

        if (i === 0) {
          return 0;
        }
        if (bottomThree.includes(items[i].key)) {
          return bottomThree.indexOf(items[i].key) * panelWidth;
        }

        // const columnsFromRight = (i: number) =>
        //   Math.min(Math.ceil(i / columns) * columns, numItems) -
        //   Math.floor(i / columns) * columns;

        // const column = (() => {
        //   if (columnsFromRight(i)) {
        //     return columnsFromRight(i);
        //   } else if (
        //     columnsFromRight(i) === 0 &&
        //     columnsFromRight(i + columns) !== 0
        //   ) {
        //     return columnsFromRight(i + 1);
        //   } else {
        //     return columns;
        //   }
        // })();

        // const emptyLeftHandSpace = (width - panelWidth * column) / 2;

        // return (emptyLeftHandSpace + (itemsWithoutBottomThree.indexOf(i) % columns) * panelWidth) + width / 3;
        return (itemsWithoutBottomThree.indexOf(i) % columns) * panelWidth + width / 3;
        // return 1500;
      };

      const getY = (i: number) => {
        if (i === 0) {
          return height / 6;
        }
        if (bottomThree.includes(items[i].key)) {
          return height / 2;
        }

          const { height: panelHeight } = getPanelDimensions(i);
          return (
            Math.floor(itemsWithoutBottomThree.indexOf(i) / columns) * panelHeight +
            height / 6
          );
        }

        return {
          ...state,
          panel: PanelState.BottomThree,
          getPanelDimensions,
          getX,
          getY,
        };
      };


      case PanelState.BottomTwo: {
        const itemsWithoutBottomThree = xorTwoArraysNonSymmetry(
          items.map(({ key }) => key),
          [0, ...bottomThree],
        );
  
        const getPanelDimensions = (i: number) => {
          if (i === 0 || bottomThree.includes(items[i].key)) {
            return {
              height: height / 3,
              get width() {
                return getPanelWidth(this.height);
              },
            };
          }
  
          const smallerPanelWidth = (width * 2) / 3 / columns;
          const potentialRows = Math.ceil(itemsWithoutBottomThree.length / columns);
  
          const totalSmallPanelHeights =
            Math.ceil(itemsWithoutBottomThree.length / columns) *
            getPanelHeight(smallerPanelWidth);
  
          if (totalSmallPanelHeights > height / 3) {
            return {
              height: (height / 3) / potentialRows,
              get width() {
                return getPanelWidth(this.height);
              },
            };
          }
          return {
            width: smallerPanelWidth,
            get height() {
              return getPanelHeight(this.width);
            },
          };
        };
  
        const getX = (i: number) => {
          const { width: panelWidth } = getPanelDimensions(i);
  
          if (i === 0) {
            return 0;
          }
          if (bottomThree.includes(items[i].key)) {
            return bottomThree.indexOf(items[i].key) * panelWidth + width / 6;
          }
  
          // const columnsFromRight = (i: number) =>
          //   Math.min(Math.ceil(i / columns) * columns, numItems) -
          //   Math.floor(i / columns) * columns;
  
          // const column = (() => {
          //   if (columnsFromRight(i)) {
          //     return columnsFromRight(i);
          //   } else if (
          //     columnsFromRight(i) === 0 &&
          //     columnsFromRight(i + columns) !== 0
          //   ) {
          //     return columnsFromRight(i + 1);
          //   } else {
          //     return columns;
          //   }
          // })();
  
          // const emptyLeftHandSpace = (width - panelWidth * column) / 2;
  
          // return (emptyLeftHandSpace + (itemsWithoutBottomThree.indexOf(i) % columns) * panelWidth) + width / 3;
          return (itemsWithoutBottomThree.indexOf(i) % columns) * panelWidth + width / 3;
          // return 1500;
        };
  
        const getY = (i: number) => {
          if (i === 0) {
            return height / 6;
          }
          if (bottomThree.includes(items[i].key)) {
            return height / 2;
          }
  
            const { height: panelHeight } = getPanelDimensions(i);
            return (
              Math.floor(itemsWithoutBottomThree.indexOf(i) / columns) * panelHeight +
              height / 6
            );
          }
  
          return {
            ...state,
            panel: PanelState.BottomTwo,
            getPanelDimensions,
            getX,
            getY,
          };
        };
  
  

    case PanelState.Max: {
      // const maxAction = action as MaxAction;
      const maxIndex = action?.newMaxIndex;

      const largePanelWidth = (columns - 1) * minPanelWidth;

      const getPanelDimensions = (index: number | undefined) => {
        const potentialRows = items.length - 1;
  
        const totalSmallPanelHeights =
          potentialRows *
          getPanelHeight(minPanelWidth);

        if (totalSmallPanelHeights > height) {
          return {
            width: maxIndex === items[index].key ? largePanelWidth : minPanelWidth / 2,
            get height() {
              return getPanelHeight(this.width);
            },
          };
        }

        return ({
          width: maxIndex === items[index].key ? largePanelWidth : minPanelWidth,
          get height() {
            return getPanelHeight(this.width);
          },
        });
      };

      const getX = (i: number) => {
        if (i === maxIndex) {
          // TODO: enhance
          return 0;
        }
        const { width: panelWidth } = getPanelDimensions(i);
        return largePanelWidth + panelWidth * (i % 2);
      };

      const getY = (i: number) => {
        const { height: panelHeight } = getPanelDimensions(i);
        if (i === maxIndex) {
          return 0;
        }
        return Math.floor(i / 2) * panelHeight;
      };

      return {
        ...state,
        panel: PanelState.Max,
        maxIndex,
        getPanelDimensions,
        getX,
        getY,
      };
    }
    default:
      return state;
  }
};
