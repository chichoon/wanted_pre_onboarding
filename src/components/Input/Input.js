import React, { useEffect, useState } from 'react';

import cx from 'classnames';

import PasswordInput from './PasswordInput';
import styles from './Input.module.scss';
import { CheckIcon } from '../../assets/svgs';

const Input = ({ setFuncEmail, setFuncPassword }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [ifEmailValid, setIfEmailValid] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const handleEmailChange = e => {
    const regex = /[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    setInputEmail(e.target.value);
    if (e.target.value.match(regex)) setIfEmailValid(true);
    else setIfEmailValid(false);
  };

  const handleEmailBlur = e => {
    e.preventDefault();
    setIsHidden(!ifEmailValid && inputEmail.length > 0 ? true : false);
  };

  useEffect(() => {
    setFuncEmail(inputEmail);
    setFuncPassword(inputPassword);
  }, [inputEmail, inputPassword]);

  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputContainer}>
        <label htmlFor="email">E-mail</label>
        <div>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={inputEmail}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <label className={cx({ isHidden: isHidden })}>
            Invalid E-mail address.
          </label>
          <CheckIcon />
        </div>
      </div>

      <PasswordInput
        className="input-div passwd"
        inputPassword={inputPassword}
        setInputPassword={setInputPassword}
      />
    </div>
  );
};

export default Input;
