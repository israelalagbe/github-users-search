import React, { useEffect } from 'react';

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import debounce from '../util/debounce';
import { fetchUsersCompletion } from '../store/actions/users';


/**
 * This component also provides autocompletion
 * @param {object} props 
 * @param {(text:string)=>void} props.setSearchText
 */
function SearchForm({ setSearchText }) {

  const dispatch = useDispatch();
  //auto completion data
  const usersCompletions = useSelector((state) => state.user.usersCompletions);

  const debouncedSetSearchText = debounce(setSearchText,500);

  const handleOnSearch = (text) => {

    const searchText= text.trim();

    //Because of github rate limiting
    if(searchText.length && searchText.length < 2){
      //Fecth autocompletion data
      dispatch(fetchUsersCompletion(searchText));
    }
    
    debouncedSetSearchText(searchText);

  }

  const handleOnSelect = item => {
    setSearchText(item.name);

  }

  const autoCompletionItems = usersCompletions.map((user)=> ({name: user.login}));

  

 

  return (
    <ReactSearchAutocomplete

      placeholder="Search Users"
      items={autoCompletionItems}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      autoFocus
      maxResults={6}
      inputDebounce={0}
    />
  );
}
export default React.memo(SearchForm);