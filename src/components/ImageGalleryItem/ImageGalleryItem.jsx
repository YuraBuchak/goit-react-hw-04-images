import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from '../styles.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ picture }) => {
  const { webformatURL, largeImageURL, tags } = picture;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleImgClick = e => toggleModal();

  return (
    <>
      <li className={css.ImageGalleryItemImage} onClick={toggleModal}>
        <img className={css.image} src={webformatURL} alt={tags} />
      </li>

      {showModal && (
        <Modal src={largeImageURL} alt={tags} onClick={handleImgClick} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
