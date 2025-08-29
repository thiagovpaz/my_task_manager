import { useCallback, useState } from 'react';
import { Alert, FlatList, Keyboard, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Crypto from 'expo-crypto';

import { MainStackParamList } from '../../navigation';
import { Task, useTaskStore } from '../../store';

import {
  Container,
  Header,
  Title,
  Content,
  ItemContainer,
  ItemTitle,
  ItemButtonsContainer,
  ItemButton,
  ListEmpty,
  QuickTaskContainer,
  QuickTaskInput,
  QuickTaskButton,
} from './styles';

const HomeScreen = () => {
  const [quickTask, setQuickTask] = useState<string | null>(null);

  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();
  const { tasks, addTask, toggleTask, removeTask } = useTaskStore();

  const handleAddQuickTask = useCallback(() => {
    if (quickTask) {
      const task: Task = {
        id: Crypto.randomUUID(),
        title: quickTask,
        completed: false,
      };

      addTask(task);

      setQuickTask('');

      Keyboard.dismiss();
    }
  }, [quickTask]);

  const handleRemoveTask = useCallback((task: Task) => {
    Alert.alert(`Confirmar ação`, `Deseja remover a tarefa: ${task.title}`, [
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          removeTask(task.id);
        },
      },
      { text: 'Cancelar' },
    ]);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Tarefas ({tasks.length})</Title>
      </Header>

      <Content>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <ItemContainer>
              <ItemTitle completed={item.completed}>{item.title}</ItemTitle>

              <ItemButtonsContainer>
                <ItemButton onPress={() => toggleTask(item.id)}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={item.completed ? 'green' : 'gray'}
                  />
                </ItemButton>
                <ItemButton
                  onPress={() => {
                    navigate('ManageTaskScreen', { id: item.id });
                  }}
                >
                  <Ionicons name="create-outline" size={24} color="blue" />
                </ItemButton>
                <ItemButton onPress={() => handleRemoveTask(item)}>
                  <Ionicons name="trash" size={24} color="red" />
                </ItemButton>
              </ItemButtonsContainer>
            </ItemContainer>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ width: '100%', height: 10 }} />
          )}
          ListEmptyComponent={<ListEmpty>Nenhuma tarefa</ListEmpty>}
        />

        <QuickTaskContainer>
          <QuickTaskInput
            placeholder="Nova tarefa"
            onChangeText={setQuickTask}
            value={quickTask || ''}
          />

          <QuickTaskButton
            onPress={() => {
              if (quickTask) {
                handleAddQuickTask();
              } else {
                navigate('ManageTaskScreen', {});
              }
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
