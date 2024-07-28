import { newYorkTimesArticles } from "../globalConstant";
import cogoToast from "cogo-toast";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_URL_NEW_YORK_TIMES_KEY;
const apiUrl = process.env.REACT_APP_API_URL_SOURCE_TWO;


const getAllArticles = async (req) => {
  let keywordSearch;
  let data;

  if (req?.articles) {
    try {
      keywordSearch = req.articles;
      data = await axios.get(`${apiUrl}${newYorkTimesArticles}?q=${keywordSearch}&api-key=${apiKey}`);
      if (data?.status === 200) {
        return data?.data;
      }
    } catch (error) {
      cogoToast.error("Error fetching data from New York Times API", {
        position: "top-right",
      });
      console.error("Error:", error);
      throw error;
    }
    return null;
  }
};

export { getAllArticles };
