import {
  ComponentProps,
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';
import cn from '../../utils/classnames';

import styles from './styles.module.css';

export type PlymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  className?: string;
};

export type Props<E extends ElementType> = PlymorphicProps<E> &
  Omit<ComponentProps<E>, keyof PlymorphicProps>;

const defaultElement = 'div';

const ScreenPanel: <E extends ElementType = typeof defaultElement>(
  props: Props<E>,
) => ReactElement | null = forwardRef(
  (
    { as: Component = defaultElement, className, ...props }: PlymorphicProps,
    ref: Ref<Element>,
  ) => (
    <Component className={cn(styles.panel, className)} ref={ref} {...props} />
  ),
);

export default ScreenPanel;
