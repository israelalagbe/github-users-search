import React, { useEffect } from 'react';

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesCompletions } from '../store/actions/movie';
import debounce from '../util/debounce';


/**
 * This component also provides autocompletion
 * @param {object} props 
 * @param {(text:string)=>void} props.setSearchText
 */
function SearchForm({ setSearchText }) {

  const dispatch = useDispatch();
  // const { moviesCompletions, loading } = useSelector((state) => state.movie);

  const debouncedSetSearchText = debounce(setSearchText,500);

  const handleOnSearch = (text) => {

    text= text.trim();
    // dispatch(fetchMoviesCompletions({ search: text }));
    debouncedSetSearchText(text);

  }

  const handleOnSelect = item => {

    debouncedSetSearchText(item.name);

  }

  const handleOnFocus = () => {

    // dispatch(fetchMoviesCompletions({ search: '' }));
    
  }

 

  return (
    <ReactSearchAutocomplete

      placeholder="Search Users"
      items={[]}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      autoFocus
    />
  );
}
export default React.memo(SearchForm);