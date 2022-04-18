import React, { useEffect, useState } from 'react';

import Styled from 'styled-components';

const Input = ({ setFuncEmail, setFuncPassword }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleOnEmailChange = e => {
    setInputEmail(e.target.value);
  };

  const handleOnPasswordChange = e => {
    setInputPassword(e.target.value);
  };

  useEffect(() => {
    setFuncEmail(inputEmail);
    setFuncPassword(inputPassword);
  }, [inputEmail, inputPassword]);

  return (
    <InputWrapper>
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={inputEmail}
        onChange={handleOnEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={inputPassword}
        onChange={handleOnPasswordChange}
      />
    </InputWrapper>
  );
};

const InputWrapper = Styled.div`
  width: 15rem;
  height: rem;
  padding: 0.5rem;

  border: 1px solid blue;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  label {
    width: 14rem;
    padding: 0.3rem;

    text-align: left;
    font-size: 0.5rem;
    color: rgba(0, 0, 0, 0.5);
  }

  input {
    width: 13rem;
    height: 2rem;
    padding: 0 0.5rem;

    border: none;
    border: 1px solid black;
  }
  input:nth-child(2) {
    margin-bottom: 1rem;
  }
`;

export default Input;
