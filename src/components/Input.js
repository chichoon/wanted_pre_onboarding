import React, { useEffect, useState } from 'react';

import Styled from 'styled-components';

const CheckIcon = () => {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        className="cls-1"
        d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
      />
      <path
        className="cls-1"
        d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
      />
    </svg>
  );
};

const EyeIcon = () => {
  return (
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
    </svg>
  );
};

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
        pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
      />
      <CheckIcon />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={inputPassword}
        onChange={handleOnPasswordChange}
      />
      <EyeIcon />
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
    background-color: #EEE;

    border: 1px solid #AAA;
    border-radius: 0.2rem;
  }

  input:nth-child(2) {
    margin-bottom: 1rem;
  }

  input:focus {
    outline: none;
    border: 1px solid black;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: black;
  }
`;

export default Input;
