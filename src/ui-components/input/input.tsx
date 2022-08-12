import { forwardRef, Ref } from 'react';

export type InputProps = {
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

const Input = ({ ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <div>
      <input
        ref={ref}
        className='appearance-none block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        {...props}
      />
    </div>
  );
};

export default forwardRef(Input);
