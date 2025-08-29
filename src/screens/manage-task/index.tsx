import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { MainStackParamList } from '../../navigation';
import { Button } from '../../components/button';
import { Switch } from '../../components/switch';
import { TextInput } from '../../components/textinput';

import { Container, Header, Title, Content } from './styles';

type FormData = {
  title: string;
  description?: string;
  completed: boolean;
};

const schema = z.object({
  title: z.string().min(1, 'Obrigatório'),
  description: z.string().optional(),
  completed: z.boolean(),
});

const ManageTaskScreen = () => {
  const { goBack } = useNavigation<NavigationProp<MainStackParamList>>();
  const { params } = useRoute<RouteProp<MainStackParamList>>();

  const id = params?.id;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: 'Tarefa 0001',
      description: 'Tarefa 0001',
      completed: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      if (id) {
        // UPDATE
      } else {
        // CREATE
      }
    },
    [id],
  );

  return (
    <Container>
      <Header>
        <Title>Gerenciar Task</Title>
      </Header>

      <Content>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              label="Título"
              placeholder="Título"
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors?.title}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              label="Descrição"
              placeholder="Descrição"
              onBlur={onBlur}
              onChangeText={onChange}
              multiline
              style={{ minHeight: 120 }}
              textAlignVertical="top"
            />
          )}
        />

        <Controller
          name="completed"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Switch
                onValueChange={onChange}
                value={value}
                label="Tarefa completa"
              />
            );
          }}
        />

        <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
      </Content>
    </Container>
  );
};

export { ManageTaskScreen };
