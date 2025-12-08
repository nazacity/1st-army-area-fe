import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface IProps {}

const LoginContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  return <div>LoginContainer</div>;
};

export default LoginContainer;
