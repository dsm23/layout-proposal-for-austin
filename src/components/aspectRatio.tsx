import { forwardRef, HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import { styled } from 'twin.macro';

import { PANEL_SCREEN_HEIGHT } from '../constants';
import { getPanelHeight } from '../utils';

interface Props {
  height?: number;
}

const StyledDiv = styled.div`
  max-height: calc(100vh - ${PANEL_SCREEN_HEIGHT * 2}px);
`;

const AspectRatio = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & Props
>((props, ref) => {
  const [localRef, { width }] = useMeasure();

  const height = getPanelHeight(width);

  return (
    <StyledDiv
      ref={mergeRefs([ref, localRef])}
      style={{
        height,
        maxHeight: '100%',
        ...props.style,
      }}
      {...props}
    />
  );
});

// const AspectRatio = styled.div`
//   height: 0;
//   padding-bottom: 56.25%;
//   width: 100%;
// `;

export default AspectRatio;
