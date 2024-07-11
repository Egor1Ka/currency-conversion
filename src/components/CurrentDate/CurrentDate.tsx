import React from 'react';
import getCurrentDate from '../../utils/getCurrentDate';

export const CurrentDate: React.FC = () => {
  return <span>{getCurrentDate()}</span>;
};
