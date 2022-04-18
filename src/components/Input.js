import React, { useEffect, useState } from 'react';

const Input = ({ setFuncEmail, setFuncPassword }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {
    setFuncEmail(inputEmail);
    setFuncPassword(inputPassword);
  });
  return <div>input</div>;
};

export default Input;
