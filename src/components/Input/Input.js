import React, { useEffect, useState } from 'react'

import cx from 'classnames'

import PasswordInput from './PasswordInput'
import styles from './Input.module.scss'
import { CheckIcon } from '../../assets/svgs'

function Input({ setFuncEmail, setFuncPassword }) {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isEmailValid, setisEmailValid] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  const handleEmailChange = (e) => {
    const regex = /[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    setInputEmail(e.target.value)
    if (e.target.value.match(regex)) {
      setisEmailValid(true)
      setIsHidden(true)
    } else setisEmailValid(false)
  }

  const handleEmailBlur = () => {
    if (!isEmailValid && inputEmail.length > 0) setIsHidden(false)
    else setIsHidden(true)
  }

  useEffect(() => {
    setFuncEmail(inputEmail)
    setFuncPassword(inputPassword)
  }, [inputEmail, inputPassword, setFuncEmail, setFuncPassword])

  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputContainer}>
        <label htmlFor='email'>E-mail</label>
        <div>
          <input
            type='email'
            name='email'
            placeholder='E-mail'
            value={inputEmail}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <label htmlFor='email' className={cx(styles.labelInvalid, { [styles.isHidden]: isHidden })}>
            Invalid E-mail address.
          </label>
          <CheckIcon className={cx({ [styles.isEmailValid]: isEmailValid })} />
        </div>
      </div>

      <PasswordInput className='input-div passwd' inputPassword={inputPassword} setInputPassword={setInputPassword} />
    </div>
  )
}

export default Input
