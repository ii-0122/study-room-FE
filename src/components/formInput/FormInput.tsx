import { forwardRef } from 'react';
import { StyledFormInput } from './FormInput.style';

const FormInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <StyledFormInput {...props} ref={ref} />);

export default FormInput;
