import { type } from 'os';
import { forwardRef, Ref } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const inputBaseStyles = css`
  ${tw`
  appearance-none 
  block w-full h-10 px-3 py-2 
  border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
  sm:text-sm`};

  &[disabled] {
    cursor: not-allowed;
  }
`;

const getErrorStyle = (hasError: boolean) => {
  if (hasError) {
    return tw`border-red-300 border-2`;
  }
  return tw``;
};

type StyledInputProps = {
  hasError: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
  ${inputBaseStyles}
  ${props => getErrorStyle(props.hasError)};
`;

export type InputProps = {
  className?: string;
  hasError?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const Input = forwardRef(({ hasError = false, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <div>
      <StyledInput ref={ref} {...props} hasError={hasError} />
    </div>
  );
});
