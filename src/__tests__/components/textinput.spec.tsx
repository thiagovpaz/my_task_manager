import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { render } from '../app.utils';
import { TextInput } from '~/components/textinput';

describe('TextInput', () => {
  it('Renders the correct text on textinput', () => {
    const { getByText } = render(<TextInput label="E-mail" />);

    expect(getByText('E-mail')).toBeTruthy();
  });

  it('Renders the correct text error message on textinput', () => {
    const error = { message: 'Campo obrigatório', type: 'required' };

    const { getByText } = render(<TextInput error={error} />);

    expect(getByText('Campo obrigatório')).toBeTruthy();
  });

  it('Dispatch the onchange event', () => {
    const onChangeMock = jest.fn();

    const { getByPlaceholderText } = render(
      <TextInput placeholder="Digite seu nome" onChangeText={onChangeMock} />,
    );

    fireEvent.changeText(getByPlaceholderText('Digite seu nome'), 'Jhon Doe');

    expect(onChangeMock).toHaveBeenCalledWith('Jhon Doe');
  });
});
