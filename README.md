# My Task Manager

Gerenciador de tarefas desenvolvido em **React Native com Expo**, focado em simplicidade e performance.

## Tecnologias utilizadas

- [Expo](https://expo.dev/) – Framework para desenvolvimento mobile multiplataforma.
- [React Navigation](https://reactnavigation.org/) – Navegação entre telas.
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) – Controle e validação de formulários.
- [Zustand](https://github.com/pmndrs/zustand) – Gerenciamento de estado global.
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – Persistência de dados offline.
- [Styled Components](https://styled-components.com/) – Estilização com CSS-in-JS.

---

## Instalação e execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/thiagovpaz/my_task_manager
   cd my_task_manager
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute o app:

   ```bash
   npm start
   ```

4. Rodar no emulador/dispositivo:
   ```bash
   npm run android
   ```

---

## Justificativas das escolhas

### AsyncStorage

- Usado para **persistir dados localmente** (tarefas, preferências, filtros).
- Simples e nativo no Expo.

### Zustand

- **Gerenciamento de estado global** simples e performático.
- Menos verboso que Redux, sem boilerplate.
- Fácil integração com **AsyncStorage** para persistência automática.

### Styled Components

- **Estilização declarativa** usando sintaxe semelhante ao CSS.
- Componentes de UI mais reutilizáveis e organizados.

### React Hook Form + Zod

- React Hook Form: **performance** em formulários sem re-renderizações desnecessárias.
- Zod: **validação tipada** e declarativa (ex: título obrigatório).

### React Navigation

- Padrão de mercado para **navegação entre telas** em apps React Native.
- Suporte a stack navigation.

---

Desenvolvido por **Thiago Paz**

- [programador@programador.me](mailto:programador@programador.me)
- [https://programador.me](https://programador.me)
