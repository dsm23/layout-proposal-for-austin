export enum PanelState {
  Standard = 'standard',
  BottomThree = 'bottomThree',
  BottomTwo = 'bottomTwo',
  Max = 'max',
}

export enum ItemsState {
  Dimensions = 'updateDimensions',
  NumItems = 'updateItemsLength',
  RemoveItem = 'removeItem',
}

export enum BottomThreeState {
  Add = 'bottomThreeAdd',
  Remove = 'bottomThreeRemove',
  Reset = 'bottomThreeReset'
}

export type State = {
  panel: PanelState;
  getPanelDimensions: (
    arg0?: number,
  ) => {
    width: number;
    height: number;
  };
  maxIndex?: number;
  getX: (arg0: number) => number;
  getY: (arg0: number) => number;
  columns: number;
  height: number;
  width: number;
  bottomThree: number[];
  items: { color: string; key: number }[];
};

export type StandardAction = { type: PanelState };

export type MaxAction = { type: PanelState; newMaxIndex: number };

export type ResizeAction = {
  type: ItemsState;
  columns: number;
  width: number;
  height: number;
};

export type ItemsAction = {
  type: ItemsState;
  numItems: number;
};

export type BottomThreeAction = {
  type: BottomThreeState;
  removalTarget?: number;
  additionTarget?: number;
}

export type RemoveItemAction = {
  type: ItemsState;
  removalTarget: number;
}

export type Action = StandardAction | MaxAction | ResizeAction | ItemsAction | BottomThreeAction | RemoveItemAction;
