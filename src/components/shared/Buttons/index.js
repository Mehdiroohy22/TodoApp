import { El } from '@/library/El';
// delete icon

export const variants = {
  delete: 'bg-red-600 text-white p-1 rounded mx-1 flex items-center',
  edit: 'bg-sky-700 text-white p-1 rounded mx-1 flex items-center',
  view: 'bg-slate-500 text-white p-1 rounded mx-1 flex items-center',
  contained: 'p-1 rounded text-inherit',
};
export const Button = ({ element = 'button', child, variant, ...rest }) => {
  return El({
    element,
    className: variants[variant],
    child,
    ...rest,
  });
};
export const statusVariants = {
  low: 'bg-gray-300 rounded-2xl inline py-1 px-2',
  medium: 'bg-yellow-500 rounded-2xl inline py-1 px-2',
  high: 'bg-red-500 text-white rounded-2xl inline py-1 px-2',
  todo: 'bg-red-500 text-white rounded-2xl inline py-1 px-2',
  doing: 'bg-yellow-500 rounded-2xl inline py-1 px-2',
  done: 'bg-green-700 text-white rounded-2xl inline py-1 px-2',
};
