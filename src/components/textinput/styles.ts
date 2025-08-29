import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const FieldContainer = styled.View``;

export const InputLabel = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 5px;
`;

export const InputContainer = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 10px;
  min-height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

export const InputBase = styled(TextInput)`
  font-size: 18px;
  flex: 1;
`;

export const ErrorLabel = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.red};
  bottom: -5px;
`;
