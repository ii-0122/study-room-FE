import { forwardRef, ComponentPropsWithRef } from 'react';

import { StyledButton } from './Button.style';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  size?: 'small' | 'medium' | 'large';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'medium', ...props }, ref) => (
    <StyledButton ref={ref} size={size} {...props}>
      {props.children}
    </StyledButton>
  )
);

export default Button;
