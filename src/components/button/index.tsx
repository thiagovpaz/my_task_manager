import React from 'react';
import { ImageSourcePropType, TouchableOpacityProps } from 'react-native';

import { Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  icon?: ImageSourcePropType;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  isLoading,
  ...rest
}) => {
  return (
    <Container
      accessibilityRole="button"
      activeOpacity={0.7}
      {...rest}
      disabled={isLoading || rest.disabled}
    >
      {!isLoading && <ButtonText>{children}</ButtonText>}
    </Container>
  );
};

export { Button };
