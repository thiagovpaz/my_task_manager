import {
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
} from 'react-native';

interface TextInputProps extends TextInputPropsRN {}

const TextInput: React.FC<TextInputProps> = (props) => {
  return <TextInputRN {...props} />;
};

export { TextInput };
