import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';

import { fireEvent, render } from '../app.utils';
import { HomeScreen } from '~/screens/home';
import { useTaskStore } from '~/store';

const mockRemoveTask = jest.fn();
const mockToggleTask = jest.fn();
const mockAddTask = jest.fn();
const mockSetFilter = jest.fn();

jest.mock('~/store', () => ({
  useTaskStore: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    useNavigation: () => ({ navigate: mockNavigate }),
  };
});

jest.spyOn(Alert, 'alert');

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const tasks = [
      { id: '1', title: 'Tarefa 1', completed: false },
      { id: '2', title: 'Tarefa 2', completed: true },
    ];

    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks,
      filter: 'all',
      addTask: mockAddTask,
      toggleTask: mockToggleTask,
      removeTask: mockRemoveTask,
      setFilter: mockSetFilter,
      getFilteredTasks: jest.fn(() => tasks.filter((t) => t.completed)),
    });
  });

  const renderScreen = () =>
    render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );

  it('Renders tasks and title correctly', () => {
    const { getByText } = renderScreen();

    expect(getByText('Tarefas (2)')).toBeTruthy();
    expect(getByText('Tarefa 1')).toBeTruthy();
    expect(getByText('Tarefa 2')).toBeTruthy();
  });

  it('Adds a quick task', () => {
    const { getByPlaceholderText, getByText } = renderScreen();

    const input = getByPlaceholderText('Nova tarefa');
    fireEvent.changeText(input, 'Minha nova tarefa');

    const button = getByText('Nova');

    fireEvent.press(button);

    expect(useTaskStore().addTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Minha nova tarefa',
        completed: false,
      }),
    );
  });

  it('Navigates to ManageTaskScreen when clicking nova', () => {
    const { getByText } = renderScreen();

    const button = getByText('Nova');

    fireEvent.press(button);

    expect(mockAddTask).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('ManageTaskScreen', {});
  });

  it('Navigates to ManageTaskScreen when clicking edit', () => {
    const { getAllByLabelText } = renderScreen();

    fireEvent.press(getAllByLabelText('edit-task')[1]);

    expect(mockNavigate).toHaveBeenCalledWith('ManageTaskScreen', {
      id: '2',
    });
  });

  it('Calls toggleTask when selecting/deselecting a task', () => {
    const { getAllByLabelText } = renderScreen();

    fireEvent.press(getAllByLabelText('toggle-task')[0]);

    expect(useTaskStore().toggleTask).toHaveBeenCalledWith('1');
  });

  it('Opens alert when removing task', () => {
    const { getAllByLabelText } = renderScreen();

    fireEvent.press(getAllByLabelText('remove-task')[0]);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Confirmar ação',
      'Deseja remover a tarefa: Tarefa 1',
      expect.any(Array),
    );
  });

  it('Executes removeTask when confirming in Alert', () => {
    (Alert.alert as jest.Mock).mockImplementation((_title, _msg, buttons) => {
      const removeBtn = buttons?.find(
        (b: { text: string }) => b.text === 'Remover',
      );
      removeBtn?.onPress?.();
    });

    const { getAllByLabelText, debug } = renderScreen();

    fireEvent.press(getAllByLabelText('remove-task')[0]);

    expect(mockRemoveTask).toHaveBeenCalledWith('1');
  });

  it('Filters tasks when clicking "Concluídas"', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Concluídas'));

    expect(useTaskStore().setFilter).toHaveBeenCalledWith('completed');
    expect(useTaskStore().getFilteredTasks().length).toBe(1);
  });

  it('Filters tasks when clicking "Ativas"', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Ativas'));

    expect(useTaskStore().setFilter).toHaveBeenCalledWith('active');
    expect(useTaskStore().getFilteredTasks().length).toBe(1);
  });

  it('Filters tasks when clicking "Todas"', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Todas'));

    expect(useTaskStore().setFilter).toHaveBeenCalledWith('all');
    expect(useTaskStore().tasks.length).toBe(2);
  });

  it('Uses getFilteredTasks when filter is not "Todas"', () => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: [
        { id: '1', title: 'Tarefa 1', completed: false },
        { id: '2', title: 'Tarefa 2', completed: true },
      ],
      filter: 'completed',
      addTask: jest.fn(),
      toggleTask: jest.fn(),
      removeTask: jest.fn(),
      setFilter: jest.fn(),
      getFilteredTasks: jest.fn(() => [
        { id: '2', title: 'Tarefa 2', completed: true },
      ]),
    });

    const { queryByText } = renderScreen();

    expect(queryByText('Tarefa 2')).toBeTruthy();

    expect(queryByText('Tarefa 1')).toBeNull();
  });
});
