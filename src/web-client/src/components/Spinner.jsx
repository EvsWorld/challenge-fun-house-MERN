import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export function Spinner({ loading }) {
  return <ClipLoader size={150} color={'#123abc'} loading={loading} />;
}
