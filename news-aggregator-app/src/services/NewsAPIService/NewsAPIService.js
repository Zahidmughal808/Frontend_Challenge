import requestObj from "../httpRequest";
import axios from "axios";
import {
  newsAPIeverything,
  newsAPItopHeadlines
} from "../globalConstant";
import cogoToast from "cogo-toast";
const apiKey = process.env.REACT_APP_API_URL_NEWS_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL_SOURCE_ONE;

const getEverthingFromNewsApi = async (req) => {
  let keywordSearch;
  let data;

  if (req?.articles) {
    keywordSearch = req.articles;
    data = await requestObj.get(
      `${newsAPIeverything}?q=${keywordSearch}&apiKey=${apiKey}`
    );
    if (data.status === 200) {
      return data;
    }
  }
};

const getNewFromRange = async (searchedKeyword, req) => {
  console.log("date req", req);
  let data;
  if (searchedKeyword && req) {
    let keyword = searchedKeyword.articles;
    let fromDate = req?.fromDate;
    let toDate = req?.toDate;
    data = await requestObj.get(
      `${newsAPIeverything}?q=${keyword}&from=${fromDate}&to=${toDate}&apiKey=${apiKey}`
    );
    if (data.status === 200) {
      return data;
    }
  }
};

const filterByCategoryAndSource = async (req) => {
  let data;

  if (req?.category !== "") {
    let findCategory = req?.category;
    data = await requestObj.get(
      `${newsAPItopHeadlines}?category=${findCategory}&pageSize=${100}&apiKey=${apiKey}`
    );
    if (data.status === 200) {
      return data;
    }
  } else if (req?.source !== "") {
    let findSource = req?.source;
    data = await requestObj.get(
      `${newsAPItopHeadlines}?sources=${findSource}&pageSize=${100}&apiKey=${apiKey}`
    );
    if (data.status === 200) {
      return data;
    }
  }
};

const getNewsArticles = async (req) => {
  let keywordSearch;
  let data;

  if (req?.articles) {
    try {
      keywordSearch = req.articles;
      data = await axios.get(
        `${apiUrl}${newsAPIeverything}?q=${keywordSearch}&apiKey=${apiKey}`
      );
      if (data?.status === 200) {
        return data?.data;
      }
    } catch (error) {
      cogoToast.error("Error fetching data from News API", {
        position: "top-right",
      });
      console.error("Error:", error);
      throw error;
    }
    return null;
  }
};

export {
  getEverthingFromNewsApi,
  getNewFromRange,
  filterByCategoryAndSource,
  getNewsArticles,
};
