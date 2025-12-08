import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface IProps {}

const RegisterContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  return <div>RegisterContainer</div>;
};

export default RegisterContainer;
