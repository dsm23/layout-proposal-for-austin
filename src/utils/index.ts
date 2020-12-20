export * from './reducer';

export const getPanelHeight = (width: number) => (width * 56.25) / 100;

export const getPanelWidth = (height: number) => height * 100 / 56.25;

// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
export const xorTwoArraysNonSymmetry = <T>(arr1: T[], arr2: T[]) =>
  arr1.filter((x: T) => !arr2.includes(x));

export const rmItemArray = <T>(arr: T[], i: number) => [
  ...arr.slice(0, i),
  ...arr.slice(i + 1),
]
