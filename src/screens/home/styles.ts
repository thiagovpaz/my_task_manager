import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

import { TextInput } from '../../components/textinput';
import { Button } from '../../components/button';

export const Container = styled(SafeAreaView)`
  flex: 1;
  position: relative;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.blue};
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
`;

export const Content = styled.View`
  flex: 1;
  padding: 15px;
`;

export const ItemContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

interface ItemTitleProps {
  completed?: boolean;
}

export const ItemTitle = styled.Text<ItemTitleProps>`
  font-size: 20px;

  ${({ completed }) =>
    completed &&
    css`
      text-decoration: line-through;
      opacity: 0.4;
    `}
`;

export const ItemButtonsContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const ItemButton = styled(Button)`
  background-color: transparent;
`;

export const ListEmpty = styled.Text`
  flex: 1;
  font-size: 18px;
  text-align: center;
`;

export const QuickTaskContainer = styled.View`
  position: absolute;
  bottom: 40px;
  left: 15px;
  right: 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: #fff;
`;

export const QuickTaskInput = styled(TextInput)`
  flex: 1;
`;

export const QuickTaskButton = styled(Button)`
  flex: 0.4;
`;
