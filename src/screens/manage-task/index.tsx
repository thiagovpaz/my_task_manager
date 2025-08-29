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
        <TextInput placeholder="Título" />

        <TextInput placeholder="Descrição" />

        <Switch />

        <Button>Salvar</Button>
      </Content>
    </Container>
  );
};

export { ManageTaskScreen };
