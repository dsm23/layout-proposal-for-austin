import { FunctionComponent, SVGAttributes } from 'react';
import { theme } from 'twin.macro';

type Props = SVGAttributes<SVGSVGElement>;

const User: FunctionComponent<Props> = props => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M19.33 18.79A8.002 8.002 0 0012 14c-3.28 0-6.09 1.97-7.33 4.79C6.5 20.76 9.1 22 12 22c2.9 0 5.5-1.24 7.33-3.21z" />
    <path
      strokeLinecap="square"
      strokeMiterlimit={10}
      stroke={theme`colors.purple.500`}
      d="M19.33 18.79A8.002 8.002 0 0012 14c-3.28 0-6.09 1.97-7.33 4.79"
    />
    <path d="M12 14a4 4 0 100-8 4 4 0 000 8z" />
    <path
      strokeLinecap="square"
      strokeMiterlimit={10}
      stroke={theme`colors.purple.500`}
      d="M12 14a4 4 0 100-8 4 4 0 000 8z"
    />
  </svg>
);

export default User;
