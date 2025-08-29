import { Button } from '../../components/button';
import { Switch } from '../../components/switch';
import { TextInput } from '../../components/textinput';

import { Container, Header, Title, Content } from './styles';

const ManageTaskScreen = () => {
  return (
    <Container>
      <Header>
        <Title>Gerenciar Task</Title>
      </Header>

      <Content>
        <TextInput label="Título" placeholder="Título" />

        <TextInput
          label="Descrição"
          placeholder="Descrição"
          multiline
          numberOfLines={10}
          style={{ minHeight: 150 }}
          textAlignVertical="top"
        />

        <Switch />

        <Button>Salvar</Button>
      </Content>
    </Container>
  );
};

export { ManageTaskScreen };
