import React, { useState } from 'react';

const EmailInput = ({ className, inputEmail, setInputEmail }) => {
  const [ifEmailValid, setIfEmailValid] = useState(false);
  const [ifShown, setIfShown] = useState(false);

  const handleOnEmailChange = e => {
    const regex = /[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
    setInputEmail(e.target.value);
    if (e.target.value.match(regex)) setIfEmailValid(true);
    else setIfEmailValid(false);
  };

  const handleOnBlur = e => {
    e.preventDefault();
    setIfShown(!ifEmailValid && inputEmail.length > 0 ? true : false);
    console.log(ifEmailValid);
  };

  return (
    <div className={className}>
      <label htmlFor="email">E-mail</label>
      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={inputEmail}
          onChange={handleOnEmailChange}
          onBlur={handleOnBlur}
        />
        <label style={{ display: `${ifShown ? '' : 'none'}` }}>
          Invalid E-mail address.
        </label>
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: `${ifEmailValid ? 'teal' : '#CCC'}` }}
        >
          <path
            className="cls-1"
            d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
          />
          <path
            className="cls-1"
            d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default EmailInput;
