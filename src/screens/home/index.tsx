import { useCallback, useState } from 'react';
import { Alert, FlatList, Keyboard, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Crypto from 'expo-crypto';
import { observer } from 'mobx-react-lite';

import { Task } from '~/store/types';
import { MainStackParamList } from '~/navigation';
import { useTaskStore } from '~/store';

import {
  Container,
  Header,
  Title,
  Content,
  FilterContainer,
  FilterButton,
  ItemContainer,
  ItemTitle,
  ItemButtonsContainer,
  ItemButton,
  ListEmpty,
  QuickTaskContainer,
  QuickTaskInput,
  QuickTaskButton,
} from './styles';

const HomeScreen = observer(() => {
  const [quickTask, setQuickTask] = useState<string | null>(null);

  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();

  const {
    filter,
    tasks,
    addTask,
    toggleTask,
    removeTask,
    getFilteredTasks,
    setFilter,
  } = useTaskStore();

  const handleAddQuickTask = useCallback(() => {
    if (!!quickTask) {
      const task: Task = {
        id: Crypto.randomUUID(),
        title: quickTask,
        completed: false,
      };

      addTask(task);

      setQuickTask('');

      Keyboard.dismiss();
    } else {
      navigate('ManageTaskScreen', {});
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

  let data = filter !== 'all' ? getFilteredTasks() : tasks;

  return (
    <Container>
      <Header>
        <Title>Tarefas ({tasks.length})</Title>
      </Header>

      <Content>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ItemContainer>
              <ItemTitle completed={item.completed}>{item.title}</ItemTitle>

              <ItemButtonsContainer>
                <ItemButton
                  accessibilityRole="button"
                  accessibilityLabel="toggle-task"
                  onPress={() => toggleTask(item.id)}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={item.completed ? 'green' : 'gray'}
                  />
                </ItemButton>
                <ItemButton
                  accessibilityRole="button"
                  accessibilityLabel="edit-task"
                  onPress={() => {
                    navigate('ManageTaskScreen', { id: item.id });
                  }}
                >
                  <Ionicons name="create-outline" size={24} color="blue" />
                </ItemButton>
                <ItemButton
                  accessibilityRole="button"
                  accessibilityLabel="remove-task"
                  onPress={() => handleRemoveTask(item)}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </ItemButton>
              </ItemButtonsContainer>
            </ItemContainer>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ width: '100%', height: 10 }} />
          )}
          ListEmptyComponent={<ListEmpty>Nenhuma tarefa</ListEmpty>}
          ListHeaderComponent={
            <FilterContainer>
              <FilterButton
                active={filter === 'all'}
                onPress={() => setFilter('all')}
              >
                Todas ({tasks.length})
              </FilterButton>
              <FilterButton
                active={filter === 'completed'}
                onPress={() => setFilter('completed')}
              >
                Concluídas ({tasks.filter((t) => t.completed).length})
              </FilterButton>
              <FilterButton
                active={filter === 'active'}
                onPress={() => setFilter('active')}
              >
                Ativas ({tasks.filter((t) => !t.completed).length})
              </FilterButton>
            </FilterContainer>
          }
          style={{
            marginBottom: 100,
          }}
        />
      </Content>

      <QuickTaskContainer>
        <QuickTaskInput
          placeholder="Nova tarefa"
          onChangeText={setQuickTask}
          value={quickTask || ''}
        />

        <QuickTaskButton
          onPress={() => {
            handleAddQuickTask();
          }}
        >
          Nova
        </QuickTaskButton>
      </QuickTaskContainer>
    </Container>
  );
});

export { HomeScreen };
