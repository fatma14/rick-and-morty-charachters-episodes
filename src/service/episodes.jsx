import axios from "axios";

export default function getEpisodeById(url) {
  return axios.get(url).then((response) => response.data);
}
