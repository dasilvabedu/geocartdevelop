import React, { useState } from 'react';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

import BasePage from '../../layout/BasePage';

import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const handleLoginChange = event => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <BasePage>
      <Paper className={ styles.box }>
        <div className={ styles.contentWrapper }>
          <h1 className={ styles.title }>Realize o login</h1>
          <form onSubmit={ handleSubmit }>
            <FormControl className={ styles.formControl }>
              <InputLabel htmlFor="field-login">Usuário</InputLabel>
              <Input
                id="field-login"
                type="text"
                value={ login }
                onChange={ handleLoginChange }
              />
            </FormControl>
            <FormControl className={ styles.formControl }>
              <InputLabel htmlFor="field-password">Senha</InputLabel>
              <Input
                id="field-password"
                type="password"
                value={ password }
                onChange={ handlePasswordChange }
              />
            </FormControl>
            <div className={ styles.actionsWrapper }>
              <Button
                variant="contained"
                color="primary"
                href="/"
              >
                Entrar
              </Button>
            </div>
          </form>
          <p className={ styles.info }>Não tem conta? <a href="/signup">Cadastre-se</a>.</p>
        </div>
      </Paper>
    </BasePage>
  );
}