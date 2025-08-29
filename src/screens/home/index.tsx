import { FlatList, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { MainStackParamList } from '../../navigation';
import { useTaskStore } from '../../store';

import {
  Container,
  Header,
  Title,
  Content,
  ListEmpty,
  QuickTaskContainer,
  QuickTaskInput,
  QuickTaskButton,
} from './styles';

const HomeScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();
  const { tasks } = useTaskStore();

  return (
    <Container>
      <Header>
        <Title>Home</Title>
      </Header>

      <Content>
        <FlatList
          data={tasks}
          renderItem={() => (
            <View
              style={{ width: '100%', height: 40, backgroundColor: 'red' }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ width: '100%', height: 10 }} />
          )}
          ListEmptyComponent={<ListEmpty>Nenhuma tarefa</ListEmpty>}
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
