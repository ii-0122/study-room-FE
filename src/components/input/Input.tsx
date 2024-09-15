import { forwardRef, ComponentPropsWithRef } from 'react';
import { StyledInput } from './Input.style';

interface InputProps extends ComponentPropsWithRef<'input'> {
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, ...props }, ref) => (
    <StyledInput ref={ref} hasError={hasError} {...props}>
      {props.children}
    </StyledInput>
  )
);

export default Input;
