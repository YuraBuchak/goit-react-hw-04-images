import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPicture } from '../api/Api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [pictures, setPictures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const handleSearchText = searchText => {
    setSearchText(searchText);
    setPage(1);
  };

  const handleLoadMorePicture = () => setPage(prevPage => prevPage + 1);

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    async function fetch() {
      try {
        setIsLoading(true);

        const { hits, totalHits } = await fetchPicture(searchText, page);

        if (hits.length === 0) {
          Notiflix.Notify.info('No results!');
        }

        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        if (page === 1) {
          setPictures(filtredHits);
          setTotalPages(Math.ceil(totalHits / 12));
        }

        if (page > 1) {
          setPictures(prevPictures => [...prevPictures, ...filtredHits]);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, [searchText, page]);

  return (
    <div>
      <Searchbar onSubmit={handleSearchText} />
      {isLoading && <Loader />}
      {pictures?.length === 0 && <span>Sorry, there are no pictures...</span>}
      {pictures?.length > 0 && <ImageGallery pictures={pictures} />}
      {pictures?.length > 0 && page !== totalPages && (
        <Button loadMore={handleLoadMorePicture} />
      )}
    </div>
  );
};
