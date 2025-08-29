import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

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

export const QuickTaskContainer = styled.View`
  position: absolute;
  bottom: 40px;
  left: 15px;
  right: 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const QuickTaskInput = styled(TextInput)`
  flex: 1;
`;

export const QuickTaskButton = styled(Button)`
  flex: 0.4;
`;
