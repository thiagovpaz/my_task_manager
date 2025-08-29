import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  background: ${({ theme }) => theme.colors.blue};
  min-height: 48px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.65;
      pointer-events: none;
    `};
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
