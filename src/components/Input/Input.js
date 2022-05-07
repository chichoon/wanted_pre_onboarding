import { useEffect, useState } from 'react'

import cx from 'classnames'

import styles from './Input.module.scss'
import { CheckIcon, EyeIcon } from '../../assets/svgs'

function Input({ setFuncEmail, setFuncPassword }) {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [ifHidePassword, setIfHidePassword] = useState(true)
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

  const handleEyeClick = () => {
    setIfHidePassword((prevState) => !prevState)
  }

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value)
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
          <CheckIcon className={cx(styles.checkIcon, { [styles.isEmailValid]: isEmailValid })} />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='password'>Password</label>
        <div>
          <input
            type={ifHidePassword ? 'password' : 'text'}
            name='password'
            placeholder='Password'
            value={inputPassword}
            onChange={handlePasswordChange}
          />
          <button type='button' className={styles.eyeIcon} onClick={handleEyeClick}>
            <EyeIcon className={cx({ [styles.ifHidePassword]: !ifHidePassword })} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Input
