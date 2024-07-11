import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PreserveQueryLinkProps } from '../../types/types';
export const PreserveQueryLink: React.FC<PreserveQueryLinkProps> = ({
  to,
  children,
}) => {
  const location = useLocation();
  const search = location.search;

  return <Link to={`${to}${search}`}>{children}</Link>;
};
