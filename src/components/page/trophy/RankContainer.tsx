import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface IProps {}

const RankContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  return <div>RankContainer</div>;
};

export default RankContainer;
