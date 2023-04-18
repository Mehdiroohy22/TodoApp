import { El } from '@/library/El';

export const Container = (child) => {
  return El({
    element: 'div',
    className: 'mx-auto max-w-7xl',
    child,
  });
};


