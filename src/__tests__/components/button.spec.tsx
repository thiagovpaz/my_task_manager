import { render } from '../app.utils';
import { Button } from '~/components/button';

describe('Button', () => {
  it('Renders the correct text on button', () => {
    const { getByText } = render(<Button>Salvar</Button>);

    expect(getByText('Salvar')).toBeTruthy();
  });

  it('Renders correctly button when disabled', () => {
    const { getByRole } = render(<Button disabled>Salvar</Button>);

    const button = getByRole('button');

    expect(button).toBeDisabled();
  });
});
