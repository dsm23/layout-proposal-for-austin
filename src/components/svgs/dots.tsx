import { FunctionComponent, SVGAttributes } from 'react';

type Props = SVGAttributes<SVGSVGElement>;

const Dots: FunctionComponent<Props> = props => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M10 12a2 2 0 104 0 2 2 0 00-4 0zm0 7a2 2 0 104 0 2 2 0 00-4 0zm0-14a2 2 0 104 0 2 2 0 00-4 0z" />
  </svg>
);

export default Dots;
