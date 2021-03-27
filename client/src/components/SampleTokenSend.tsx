import React, { useEffect } from 'react';
import axios from 'axios';

interface props {
  token: string | null;
}

const SampleTokenSend = ({ token }: props) => {
  // useEffect(() => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };

  //   axios.get('/api/sample', config);
  // });

  return <div></div>;
};

export default SampleTokenSend;
