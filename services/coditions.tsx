// import api from "./apis";
import axios from "axios";

const api = "http://localhost:3004/";

export const conditionService = {
  diseaseConditions,
};

function diseaseConditions() {
  return axios.get(api + "conditions");
}
