import axios from "axios";

const url = "https://rickandmortyapi.com/api/character/";

export function getCharacters() {
  return axios.get(url).then((response) => {
    return response.data.results;
  });
}

export function getCharacterById(id) {
  return axios.get(url + `${id}`).then((response) => {
    return response.data;
  });
}

export function getCharactersByName(name) {
  return axios.get(url + `?name=${name}`).then((response) => {
    return response.data.name;
  });
}
