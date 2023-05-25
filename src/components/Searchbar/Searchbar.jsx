import PropTypes from 'prop-types';
import css from '../styles.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChangeInput = event => setValue(event.target.value);

  const handleSubmitForm = event => {
    event.preventDefault();

    if (value.trim() === '') {
      alert('Write smth...!');
      return;
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={css.SearchFormButton}>
          GO!
          {/* <span className={css.SearchFormButtonLabel}></span> */}
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
          value={value}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
