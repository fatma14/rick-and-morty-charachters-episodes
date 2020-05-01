import axios from "axios";

export default async function getEpisodeById(url) {
  const response = await axios.get(url);
  return response.data;
}
