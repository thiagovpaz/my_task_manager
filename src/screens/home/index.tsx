import { FlatList, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { MainStackParamList } from '../../navigation';

import {
  Container,
  Header,
  Title,
  Content,
  QuickTaskContainer,
  QuickTaskInput,
  QuickTaskButton,
} from './styles';

const HomeScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <Header>
        <Title>Home</Title>
      </Header>

      <Content>
        <FlatList
          data={[
            { id: 1, name: 'Teste' },
            { id: 2, name: 'Teste' },
          ]}
          renderItem={() => (
            <View
              style={{ width: '100%', height: 40, backgroundColor: 'red' }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ width: '100%', height: 10 }} />
          )}
        />

        <QuickTaskContainer>
          <QuickTaskInput placeholder="Nova tarefa" />

          <QuickTaskButton
            onPress={() => {
              navigate('ManageTaskScreen', {});
            }}
          >
            Nova
          </QuickTaskButton>
        </QuickTaskContainer>
      </Content>
    </Container>
  );
};

export { HomeScreen };
