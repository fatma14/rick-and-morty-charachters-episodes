import axios from "axios";

const url = "https://rickandmortyapi.com/api/character/";

export async function getCharacters() {
  const response = await axios.get(url);
  return response.data;
}

export async function getCharacterById(id) {
  const response = await axios.get(url + `${id}`);
  return response.data;
}

export async function getCharactersByName(name) {
  const response = await axios.get(url + `?name=${name}`);
  return response.data;
}

export async function getPage(url) {
  const response = await axios.get(url);
  return response.data;
}
