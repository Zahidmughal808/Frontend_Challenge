import React from "react";
import { Select } from "antd";
import { filterByCategoryAndSource } from "../../services/NewsAPIService/NewsAPIService";

export default function CategoryFilter({ setSelectFilter, setSaveNews,setSearchQueries, searchQueries }) {
  const { Option } = Select;

  const handleSelect = async (value) => {
    let categoryName = value;
    try {
      if (categoryName) {
        setSearchQueries((prevState) => ({...prevState, category: categoryName}))
        const result = await filterByCategoryAndSource(searchQueries);
        if (result?.status === 200) {
          result?.data?.articles?.length > 0 &&
            setSaveNews(result?.data?.articles);
          setSelectFilter({
            byDate: "",
            byCategory: "",
            bySource: "",
            showModal: false,
          });
          setSearchQueries((prevState) => ({...prevState, category: ''}))
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
      <label htmlFor="articles">Select Category</label>
      <Select size="large" showSearch={false} onChange={(e) => handleSelect(e)}>
        <Option value="">Please Select a Category</Option>
        {categoryOptions &&
          categoryOptions?.length > 0 &&
          categoryOptions?.map((item, index) => {
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

const categoryOptions = [
  {
    key: "technology",
    label: "Technology",
  },
  {
    key: "entertainment",
    label: "Entertainment",
  },
  {
    key: "health",
    label: "Health",
  },
  {
    key: "sports",
    label: "Sports",
  },
  {
    key: "business",
    label: "Business",
  },
  {
    key: "science",
    label: "Science",
  },
];
