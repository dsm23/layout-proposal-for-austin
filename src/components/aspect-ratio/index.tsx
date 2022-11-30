import {
  ComponentProps,
  CSSProperties,
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import cn from '../../utils/classnames';
import { getPanelHeight } from '../../utils';

import styles from './styles.module.css';

export type PlymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  className?: string;
  style: CSSProperties;
};

export type Props<E extends ElementType> = PlymorphicProps<E> &
  Omit<ComponentProps<E>, keyof PlymorphicProps>;

const defaultElement = 'div';

const AspectRatio: <E extends ElementType = typeof defaultElement>(
  props: Props<E>,
) => ReactElement | null = forwardRef(
  (
    {
      as: Component = defaultElement,
      className,
      style,
      ...props
    }: PlymorphicProps,
    ref: Ref<Element>,
  ) => {
    const [localRef, { width }] = useMeasure();

    const height = getPanelHeight(width);

    return (
      <Component
        className={cn(styles.panel, className)}
        ref={mergeRefs([ref, localRef])}
        style={{
          height,
          maxHeight: '100%',
          ...style,
        }}
        {...props}
      />
    );
  },
);

// const AspectRatio = styled.div`
//   height: 0;
//   padding-bottom: 56.25%;
//   width: 100%;
// `;

export default AspectRatio;
