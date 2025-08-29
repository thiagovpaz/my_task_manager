import { Switch as SwitchRN, SwitchProps as SwitchPropsRN } from 'react-native';

import { SwitchLabel, FieldContainer } from './styles';

interface SwitchProps extends SwitchPropsRN {
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ label, ...rest }) => {
  return (
    <FieldContainer>
      {label && <SwitchLabel>{label}</SwitchLabel>}
      <SwitchRN {...rest} />
    </FieldContainer>
  );
};

export { Switch };
