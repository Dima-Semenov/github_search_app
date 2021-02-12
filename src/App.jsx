import React, { useCallback, useEffect, useState } from 'react';
import { UserList } from './Components/UserList/UserList';
import { Header } from './Components/Header/Header';
import { getUserRepo } from './api';
import { debounce } from 'lodash';
import './App.scss';
import classNames from 'classnames';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function App() {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [repos, setRepos] = useState([]);
  const [serchValue, setSearchValue] = useLocalStorage('history', []);
  const [isError, setIsError] = useState(false);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    []
  );

  useEffect(() => {
    if (appliedQuery) {
      getUserRepo(appliedQuery)
        .then(result => {
          if (result.length === 0) {
            setIsError(true)
          } else {
            setIsError(false)
            setRepos(result)
          }
        });

        if (!serchValue.includes(appliedQuery)) {
          setSearchValue(prevState => [appliedQuery, ...prevState])
        }

    }
  }, [appliedQuery]);

  useEffect(() => {
    if (!query) {
      setRepos([])
    }
  }, [query])

  const handleChange = (value) => {
    setIsError(false)
    setRepos([])
    setQuery(value)
    applyQuery(value)
  }


  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <div className="app__searcher">
          <input
            type="text"
            className={classNames('app__input', {error: isError})}
            placeholder="Enter user name"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
          />

          {isError && (<p className="app__none">No matches found</p>)}

          <div className="app__history">
            <span className="app__history-title">Search history:</span>
            {serchValue.slice(0, 5).map(value => (
              <p
                key={Math.random()}
                className="app__history-text"
                onClick={() => handleChange(value)}
              >
                {value}
              </p>
            ))}
          </div>
        </div>

        <div className="app__content">
          {query ? (
            <UserList repos={repos} />
            ) : (
            <p className="app__unselect">Please enter a user</p>
          )}
        </div>
      </div>
    </div>
  );
}
