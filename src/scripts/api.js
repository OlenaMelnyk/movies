import 'core-js';
// import regeneratorRuntime from 'regenerator-runtime';
import { Action } from './variables';

const BASE_URL = 'https://my-json-server.typicode.com/moviedb-tech/movies/list';

const request = async(path, options) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options);
    const result = await response.json();

    return Array.isArray(result) ? result : [];
  } catch (error) {
    return null;
  }
};

export const getMovies = () => request('');

export const getFromLocalStorage = (key, initialValue) => {
  try {
    return JSON.parse(localStorage.getItem(key) || initialValue);
  } catch {
    return initialValue;
  }
};

export const updateInLocalStorage = (key, value, action = Action.TOOGLE) => {
  const prevValue = getFromLocalStorage(key, []);
  const filtered = prevValue.filter(elem => elem !== value);
  let _action = action;

  if (action === Action.TOOGLE) {
    _action = prevValue.includes(value) ? Action.REMOVE : Action.ADD;
  }

  if (_action === Action.ADD) {
    const newValue = [...prevValue, value];

    localStorage.setItem(key, JSON.stringify(newValue));
  } else if (_action === Action.REMOVE) {
    localStorage.setItem(key, JSON.stringify(filtered));
  }
};
