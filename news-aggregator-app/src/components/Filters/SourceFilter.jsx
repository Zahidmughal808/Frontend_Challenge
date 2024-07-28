import React from "react";
import { Select } from "antd";
import { filterByCategoryAndSource } from "../../services/NewsAPIService/NewsAPIService";

export default function SourceFilter({ setSelectFilter, setSaveNews, setSearchQueries, searchQueries }) {
  const { Option } = Select;

  const handleSelect = async (value) => {
    try {
      let sourceName = value;
      console.log("source", sourceName);
      if (sourceName) {
        setSearchQueries((prevState) => ({...prevState, source: sourceName}))
        const result = await filterByCategoryAndSource(searchQueries);
        console.log("api response on category", result);
        if (result?.status === 200) {
          result?.data?.articles?.length > 0 &&
            setSaveNews(result?.data?.articles);
          setSelectFilter({
            byDate: "",
            byCategory: "",
            bySource: "",
            showModal: false,
          });
          setSearchQueries((prevState) => ({...prevState, source: ''}))
        }
      }
    } catch (e) {
      console.log("error", e);
      setSelectFilter({
        byDate: "",
        byCategory: "",
        bySource: "",
        showModal: false,
      });
    }
  };
  return (
    <div className="formField">
      <label htmlFor="articles">Select Source</label>
      <Select size="large" showSearch={false} onChange={(e) => handleSelect(e)}>
        {sourceOptions &&
          sourceOptions?.length > 0 &&
          sourceOptions?.map((item, index) => {
            return (
              <Option key={index} value={item.key}>
                {item.label}
              </Option>
            );
          })}
      </Select>
    </div>
  );
}

const sourceOptions = [
  {
    key: "google-news",
    label: "Google News",
  },
  {
    key: "bbc-news",
    label: "BBC News",
  },
  {
    key: "cnn",
    label: "CNN News",
  },
];
