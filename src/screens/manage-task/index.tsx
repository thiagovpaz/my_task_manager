import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import Ionicons from '@expo/vector-icons/Ionicons';

import { MainStackParamList } from '~/navigation';
import { useTaskStore } from '~/store';
import { Button } from '~/components/button';
import { Switch } from '~/components/switch';
import { TextInput } from '~/components/textinput';

import { Container, Header, BackButton, Title, Content } from './styles';

type FormData = {
  title: string;
  description?: string;
  completed: boolean;
};

const schema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  description: z.string().optional(),
  completed: z.boolean(),
});

const ManageTaskScreen = () => {
  const { goBack } = useNavigation<NavigationProp<MainStackParamList>>();
  const { params } = useRoute<RouteProp<MainStackParamList>>();

  const { addTask, updateTask, getTaskById } = useTaskStore();

  const id = params?.id;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      completed: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      if (id) {
        updateTask({ id, ...data });
      } else {
        addTask({
          id: Crypto.randomUUID(),
          ...data,
        });
      }

      goBack();
    },
    [id],
  );

  useEffect(() => {
    if (id) {
      reset(getTaskById(id));
    }
  }, [id]);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Ionicons name="chevron-back-outline" color="#fff" size={25} />
        </BackButton>
        <Title>{id ? 'Gerenciar Task' : 'Criar Task'}</Title>
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

        <Button onPress={handleSubmit(onSubmit)}>
          {id ? 'Atualizar' : 'Salvar'}
        </Button>
      </Content>
    </Container>
  );
};

export { ManageTaskScreen };
