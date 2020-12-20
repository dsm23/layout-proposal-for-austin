import { FunctionComponent, SVGAttributes } from 'react';

type Props = SVGAttributes<SVGSVGElement>;

const UserRemove: FunctionComponent<Props> = props => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 17c0-2.25 1.5-4.13 3.54-4.76A8.95 8.95 0 0011 11a9 9 0 00-9 9h11.02A4.98 4.98 0 0112 17zm-1-6a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
    <path d="M17 22a5 5 0 100-10 5 5 0 000 10z" />
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit={10}
      stroke="#221b38"
      d="M17 22a5 5 0 100-10 5 5 0 000 10z"
    />
    <path
      strokeLinejoin="round"
      strokeMiterlimit={10}
      stroke="#221b38"
      d="M14 17h6"
    />
  </svg>
);

export default UserRemove;
