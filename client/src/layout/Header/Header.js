import React from 'react';
import { NavLink } from 'react-router-dom';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputIcon from '@material-ui/icons/Input';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import logo from './logo.png';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={ styles.wrapper }>
      <NavLink to="/">
        <img className={ styles.logoImage } src={ logo } alt="logo CTG Brasil" />
      </NavLink>
      <div className={ styles.actions }>
        <NavLink to="/sobre" className={ styles.link } activeClassName={ styles.activeLink }>O que é o PAE?</NavLink>
        <Autocomplete
          id="combo-box-demo"
          options={ [
            { title: 'São Paulo, State of São Paulo, Brazil', value: 1 }
          ] }
          noOptionsText="Nenhuma opção disponível"
          getOptionLabel={option => option.title}
          style={{ width: 300 }}
          renderInput={ (params) => (
            <TextField
              { ...params }
              label={ null }
              variant="outlined"
              placeholder="Pesquise uma localização..."
              InputProps={ {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={ { fontSize: 20, fill: '#808080' } } />
                  </InputAdornment>
                )
              } }
            />
          )}
          renderOption={ () => {
            return (
              <Grid container alignItems="center">
                <Grid item>
                  <LocationOnIcon className={ styles.locationIcon } />
                </Grid>
                <Grid item xs>
                  <span className={ styles.autocompleteOptionTitle }>São Paulo</span>
                  <span className={ styles.autocompleteOptionSubtitle }>State of São Paulo, Brazil</span>
                </Grid>
              </Grid>
            );
          }}
        />
        <Button className={ styles.signInButton } href="/login">
          <InputIcon className={ styles.signInButtonIcon } />
          <span className={ styles.signInButtonText }>Entrar</span>
        </Button>
      </div>
    </header>
  );
}
