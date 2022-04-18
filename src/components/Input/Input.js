import React, { useEffect, useState } from 'react';

import Styled from 'styled-components';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const Input = ({ setFuncEmail, setFuncPassword }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {
    setFuncEmail(inputEmail);
    setFuncPassword(inputPassword);
  }, [inputEmail, inputPassword]);

  return (
    <InputWrapper>
      <EmailInput
        className="input-div"
        inputEmail={inputEmail}
        setInputEmail={setInputEmail}
      />
      <PasswordInput
        className="input-div"
        inputPassword={inputPassword}
        setInputPassword={setInputPassword}
      />
    </InputWrapper>
  );
};

const InputWrapper = Styled.div`
  width: 15rem;
  height: 7rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .input-div {
    & > div {
      position: relative;
    }

    label {
      width: 14rem;
      padding: 0.3rem;

      text-align: left;
      font-size: 0.5rem;
      color: rgba(0, 0, 0, 0.5);

      display: flex;
      flex-direction: column;
      justify-content: left;
    }

    label:nth-child(2) {
      color: rgba(200, 0, 0, 0.7);
    }

    input {
      width: 13rem;
      height: 2rem;
      padding: 0 0.5rem;
      padding-right: 2rem;
      background-color: #EEE;

      border: 1px solid #AAA;
      border-radius: 0.2rem;
    }
  }

  .input-div:nth-child(1) {
    margin-bottom: 0.5rem;
  }

  input:focus {
    outline: none;
    border: 1px solid black;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: black;

    position: absolute;
    right: 0.5rem;
    top: 0.5rem;

    transition: fill 0.2s;
  }
`;

export default Input;
