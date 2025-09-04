import { NavigationContainer } from '@react-navigation/native';

import { ManageTaskScreen } from '~/screens/manage-task';
import { fireEvent, render, waitFor } from '../app.utils';
import { useTaskStore } from '~/store';

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    useNavigation: () => ({ goBack: mockGoBack }),
    useRoute: () => ({ params: {} }),
  };
});

jest.mock('~/store', () => {
  const mockState = {
    addTask: jest.fn(),
    updateTask: jest.fn(),
    getTaskById: jest.fn((id) => ({
      id,
      title: 'Tarefa existente',
      description: 'Descrição existente',
      completed: true,
    })),
  };
  return { useTaskStore: jest.fn(() => mockState) };
});

describe('ManageTaskScreen', () => {
  const renderScreen = () =>
    render(
      <NavigationContainer>
        <ManageTaskScreen />
      </NavigationContainer>,
    );

  it('Renders task creation screen', () => {
    const { getByText } = renderScreen();

    expect(getByText('Criar Task')).toBeTruthy();
    expect(getByText('Salvar')).toBeTruthy();
  });

  it('Show error if title is not filled in', async () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Salvar'));

    await waitFor(() => {
      expect(getByText('Título obrigatório')).toBeTruthy();
    });
  });

  it('Create new task when form is valid', async () => {
    const { getByPlaceholderText, getByText } = renderScreen();

    fireEvent.changeText(getByPlaceholderText('Título'), 'Minha Task');
    fireEvent.changeText(getByPlaceholderText('Descrição'), 'Detalhes');

    fireEvent.press(getByText('Salvar'));

    await waitFor(() => {
      expect(useTaskStore().addTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Minha Task',
          description: 'Detalhes',
          completed: false,
        }),
      );
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('Loads data from existing task when id is passed', () => {
    (require('@react-navigation/native') as any).useRoute = () => ({
      params: { id: '123' },
    });

    const { getByDisplayValue, getByText } = renderScreen();

    expect(getByText('Gerenciar Task')).toBeTruthy();
    expect(getByDisplayValue('Tarefa existente')).toBeTruthy();
    expect(getByDisplayValue('Descrição existente')).toBeTruthy();
  });

  it('Updates existing task when saved', async () => {
    (require('@react-navigation/native') as any).useRoute = () => ({
      params: { id: '123' },
    });

    const { getByText, getByPlaceholderText } = renderScreen();

    fireEvent.changeText(
      getByPlaceholderText('Título'),
      'Tarefa existente atualizada',
    );

    fireEvent.press(getByText('Atualizar'));

    await waitFor(() => {
      expect(useTaskStore().updateTask).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '123',
          title: 'Tarefa existente atualizada',
          description: 'Descrição existente',
          completed: true,
        }),
      );
      expect(mockGoBack).toHaveBeenCalled();
    });
  });
});
