import { forwardRef, MouseEventHandler, Ref } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export type ButtonVariants = 'primary' | 'secondary';

type StyledButtonProps = {
  variant: ButtonVariants;
};

const buttonBaseStyles = css`
  ${tw`
  inline-flex items-center justify-center
  h-10 py-2 px-4 
  border border-transparent rounded-md
  font-medium
  shadow-sm`};

  &[disabled] {
    cursor: not-allowed;
  }
`;

const primaryStyles = tw`
  text-white
  bg-gradient-to-r from-indigo-600 to-purple-600 bg-origin-border
  hover:from-indigo-700 hover:to-purple-700
`;

const secondaryStyles = tw`
  bg-white
  border border-2 border-gray-400 
  hover:bg-gray-100
`;

const getVariantStyle = (variant: ButtonVariants) => {
  switch (variant) {
    case 'primary':
      return primaryStyles;
    case 'secondary':
      return secondaryStyles;
    default:
      throw new Error('Invalid button variant');
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  ${buttonBaseStyles};
  ${props => getVariantStyle(props.variant)};
`;

export type ButtonProps = {
  children: React.ReactNode;
  /** Sets the current status button. */
  loading?: boolean;
  /** Callback when the button is pressed. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** The type of button. */
  variant?: ButtonVariants;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export const Button = forwardRef(
  ({ children, className, variant = 'primary', ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <StyledButton ref={ref} variant={variant} className={className} {...props}>
        {children}
      </StyledButton>
    );
  },
);
