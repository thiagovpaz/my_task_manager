import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
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
