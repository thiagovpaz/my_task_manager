import { render } from '../app.utils';
import { Switch } from '~/components/switch';

describe('Switch', () => {
  it('Renders the correct text on switch', () => {
    const { getByText } = render(<Switch label="Lembrar-me" />);

    expect(getByText('Lembrar-me')).toBeTruthy();
  });
});
