import axios from "axios";

export default async function getEpisodeById(url) {
  const response = axios.get(url);
  return response.data;
}
