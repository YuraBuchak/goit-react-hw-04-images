import { useEffect } from 'react';
import css from '../styles.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ onClick, src, tags }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    const listener = () => window.addEventListener('keydown', handleEscape);
    return () => listener();
  }, [onClick]);

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};
