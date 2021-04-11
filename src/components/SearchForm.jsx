import React, { useCallback, useEffect } from 'react';

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import debounce from '../util/debounce';
import { fetchUsersCompletion } from '../store/actions/users';


/**
 * This component also provides autocompletion
 * @param {object} props 
 * @param {(text:string)=>void} props.setSearchText
 */
function SearchForm({ searchText, setSearchText }) {

  const dispatch = useDispatch();
  //auto completion data
  const usersCompletions = useSelector((state) => state.user.usersCompletions);

  const debouncedSetSearchText = debounce(setSearchText,300);

  const handleOnSearch = (text) => {

    const trimmedText= text.trim();

    //Temporarily disable autocompletion due to closing bugs

    // if(trimmedText.length && trimmedText.length < 2){
    //   //Fecth autocompletion data
    //   dispatch(fetchUsersCompletion(trimmedText));
    // }

    
    debouncedSetSearchText(trimmedText);

    
    

  }

  const handleOnSelect = item => {
    debouncedSetSearchText(item.name);
   

  }

  const autoCompletionItems = usersCompletions.map((user)=> ({name: user.login}));

  

 

  return (
    <ReactSearchAutocomplete
      autoFocus={false}
      placeholder="Search Users"
      items={autoCompletionItems}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      maxResults={6}
      inputDebounce={0}
    />
  );
}
export default React.memo(SearchForm);