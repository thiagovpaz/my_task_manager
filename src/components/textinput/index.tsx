import {
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
} from 'react-native';
import { FieldError } from 'react-hook-form';

import {
  FieldContainer,
  InputLabel,
  InputContainer,
  InputBase,
  ErrorLabel,
} from './styles';

interface TextInputProps extends TextInputPropsRN {
  label?: string;
  error?: FieldError | undefined;
}

const TextInput: React.FC<TextInputProps> = ({ label, error, ...rest }) => {
  return (
    <FieldContainer style={rest.style}>
      {label && <InputLabel>{label}</InputLabel>}

      <InputContainer>
        <InputBase {...rest} />
      </InputContainer>

      {error && <ErrorLabel>{error.message}</ErrorLabel>}
    </FieldContainer>
  );
};

export { TextInput };
