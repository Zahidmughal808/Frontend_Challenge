import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";

export default function PersonalizeNews({
  filterOptions,
  setArticlesListByPreference,
  articlesListByPreference,
  saveNews,
  setIsFilterDataRemoved,
}) {
  const { Option } = Select;
  const [selectedPrefrence, setSelectedPreference] = useState({});
  const [touchPersonalizeField, setTouchPersonalizeField] = useState(false);

  useEffect(() => {
    if (touchPersonalizeField || articlesListByPreference?.length) {
      setTouchPersonalizeField(true);
      setIsFilterDataRemoved(true);
    } else {
      setTouchPersonalizeField(false);
      setIsFilterDataRemoved(false);
    }
  }, [touchPersonalizeField, articlesListByPreference]);

  const handleSelect = (name, value) => {
    setTouchPersonalizeField(true);
    if (value) {
      setSelectedPreference((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  useEffect(() => {
    let filteredNews;
    if (selectedPrefrence !== "undefined") {
      filteredNews = saveNews?.filter(
        (article) =>
          (article?.source.name !== null &&
            article?.source?.name === selectedPrefrence?.preferenceSource) ||
          (article.author !== null &&
            article?.author === selectedPrefrence?.preferenceAuthors)
      );
    }
    filteredNews?.length > 0 && setArticlesListByPreference(filteredNews);
  }, [selectedPrefrence]);

  const handleResetFilters = () => {
    setTouchPersonalizeField(false);
    setIsFilterDataRemoved(true);
    setArticlesListByPreference([]);
    setSelectedPreference({
      preferenceSource: "",
      preferenceAuthors: "",
      preferenceCategory: "",
    });
  };

  return (
    <div className="personalizeOptions">
      <div className="resetFilters">
        <span>Reset Filters</span>
        <Button
          disabled={!touchPersonalizeField ? true : false}
          type="primary"
          size="large"
          block
          htmlType="button"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </div>
      <div className="prefrence">
        <label htmlFor="preferenceSource">Sources</label>
        <Select
          size="large"
          name="preferenceSource"
          showSearch={false}
          onChange={(e) => handleSelect("preferenceSource", e)}
        >
          <Option value="">Select Prefer Source</Option>
          {filterOptions?.allSources &&
            filterOptions?.allSources?.length > 0 &&
            filterOptions?.allSources?.map((item, index) => {
              return (
                <Option key={index} value={item}>
                  {item}
                </Option>
              );
            })}
        </Select>
      </div>
      <div className="prefrence">
        <label htmlFor="preferenceAuthors">Authors</label>
        <Select
          size="large"
          name="preferenceAuthors"
          showSearch={false}
          onChange={(e) => handleSelect("preferenceAuthors", e)}
        >
          <Option value="">Select Prefer Author</Option>
          {filterOptions?.allAuthors &&
            filterOptions?.allAuthors?.length > 0 &&
            filterOptions?.allAuthors?.map((item, index) => {
              return (
                <Option key={index} value={item}>
                  {item}
                </Option>
              );
            })}
        </Select>
      </div>
      <div className="prefrence">
        <label htmlFor="preferenceCategory">Categories</label>
        <Select
          size="large"
          name="preferenceCategory"
          showSearch={false}
          onChange={(e) => handleSelect("preferenceCategory", e)}
        >
          <Option value="">Select Prefer Category</Option>
          {filterOptions?.allCategories &&
            filterOptions?.allCategories?.length > 0 &&
            filterOptions?.allCategories?.map((item, index) => {
              return (
                <Option key={index} value={item}>
                  {item}
                </Option>
              );
            })}
        </Select>
      </div>
    </div>
  );
}
