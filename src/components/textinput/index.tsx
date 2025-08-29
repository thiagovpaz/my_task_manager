import {
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
} from 'react-native';

import {
  FieldContainer,
  InputLabel,
  InputContainer,
  InputBase,
} from './styles';

interface TextInputProps extends TextInputPropsRN {
  label?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...rest }) => {
  return (
    <FieldContainer style={rest.style}>
      {label && <InputLabel>{label}</InputLabel>}

      <InputContainer>
        <InputBase {...rest} />
      </InputContainer>
    </FieldContainer>
  );
};

export { TextInput };
