import React, { useState, useMemo, useEffect } from "react";
import {
  Typography,
  Col,
  Row,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Space,
  Checkbox,
} from "antd";
import { getEverthingFromNewsApi } from "../services/NewsAPIService/NewsAPIService";
import { getAllArticles } from "../services/NewyorkAPIService/NewyorkAPIService";
import NewsList from "../components/NewsList";
import filtersIcon from "../assets/images/filtersIcon.svg";
import ModalContainer from "../components/ModalContainer";
import RangeDatepicker from "../components/Filters/RangeDatepicker";
import CategoryFilter from "../components/Filters/CategoryFilter";
import SourceFilter from "../components/Filters/SourceFilter";
import PersonalizeNews from "../components/PersonalizeNews";

const { Title } = Typography;
const News = () => {
  const [searchQueries, setSearchQueries] = useState({
    articles: "",
    category: "",
    source: "",
  });
  const [saveNews, setSaveNews] = useState();
  const [selectFilter, setSelectFilter] = useState({
    byDate: "",
    byCategory: "",
    bySource: "",
    showModal: false,
  });

  const [filterOptions, setFilterOptions] = useState({
    allSources: [],
    allCategories: categoryList || [],
    allAuthors: [],
  });

  const [articlesListByPreference, setArticlesListByPreference] = useState([]);
  const [filterDataRemoved, setIsFilterDataRemoved] = useState(false);

  useEffect(() => {
    let sources = [];
    let categories = categoryList || [];
    let authors = [];
    let countSource = {};
    let countAuthor = {};

    if (saveNews?.length) {
      saveNews
        ?.filter((article) => {
          if (
            !countSource[article?.source.name] &&
            article?.source.name !== null
          ) {
            countSource[article.source.name] = true;
            sources?.push(article.source.name);
          }
        })
        .map((article) => article.source.name);
      saveNews
        ?.filter((article) => {
          if (!countAuthor[article?.author] && article?.author !== null) {
            countAuthor[article.author] = true;
            authors?.push(article.author);
          }
        })
        .map((article) => article.author);
      categories = categoryList?.length && categoryList;
      setFilterOptions((prevState) => ({
        ...prevState,
        allSources: sources,
        allCategories: categories,
        allAuthors: authors,
      }));
    }
  }, [saveNews]);

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchQueries((prevState) => ({ ...prevState, articles: value }));
  };

  const handleSubmit = async () => {
    try {
      if (searchQueries) {
        const makeReq = searchQueries;
        const result = await getEverthingFromNewsApi(makeReq);
        if (result?.status === 200) {
          result?.data?.articles?.length > 0 &&
            setSaveNews(result?.data?.articles);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  /*****Fetch Articles from multiple sources*****/
  /*  const handleSubmit = async () => {
    try {
      if (searchQueries) {
        const makeReq = searchQueries;
        const [result, result2] = await Promise.allSettled([
            getNewsArticles(makeReq),
            getAllArticles(makeReq)
          ]);
          console.log('result2',result2)
          console.log('result2 data',result2?.value)
          if (result.status === "fulfilled") {
            if (result?.value?.status === 'ok') {
              result?.value?.articles?.length > 0 &&
                setSaveNews(result?.value?.articles);
            }
          } 
      }
    } catch (e) {
      console.log("error", e);
    }
  }; */

  const onChange = (e) => {
    let radioValue = e.target.value;
    if (radioValue) {
      setSelectFilter(() => {
        switch (radioValue) {
          case "by-date":
            return {
              byDate: radioValue,
              byCategory: "",
              bySource: "",
              showModal: true,
            };
          case "by-category":
            return {
              byDate: "",
              byCategory: radioValue,
              bySource: "",
              showModal: true,
            };
          case "by-sources":
            return {
              byDate: "",
              byCategory: "",
              bySource: radioValue,
              showModal: true,
            };
          default:
            return {
              byDate: "",
              byCategory: "",
              bySource: "",
              showModal: false,
            };
        }
      });
    }
  };

  const getSelectedRadioValue = () => {
    if (selectFilter.byDate) return "by-date";
    if (selectFilter.byCategory) return "by-category";
    if (selectFilter.bySource) return "by-sources";
    return "";
  };

  return (
    <div className="newspaperWrapper">
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="mainHeading">
            <Title className="title">News Aggregator App</Title>
          </div>
        </Col>
      </Row>
      <div className="pageDivision">
        <Row gutter={[30, 12]} align="top" style={{ width: "100%" }}>
          <Col xs={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
            <div className="sidebarOptions">
              <div className="filterSection">
                <img src={filtersIcon} alt="icon" />
                <h2 className="subtitle">Select Filter</h2>
              </div>
              <div className="filterOptions">
                <Radio.Group
                  onChange={onChange}
                  value={getSelectedRadioValue()}
                >
                  <Space direction="vertical">
                    <Radio value={"by-date"}>By Date</Radio>
                    <Radio value={"by-category"}>By Category</Radio>
                    <Radio value={"by-sources"}>By Source</Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className="personalizeSection">
                <h1 className="title">Personalized news feed</h1>
                <PersonalizeNews
                  filterOptions={filterOptions}
                  setArticlesListByPreference={setArticlesListByPreference}
                  articlesListByPreference={articlesListByPreference}
                  saveNews={saveNews}
                  setIsFilterDataRemoved={setIsFilterDataRemoved}
                />
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 18 }} lg={{ span: 18 }}>
            <div className="innerWrapper">
              <div className="formField">
                <label htmlFor="articles">Search News Articles</label>
                <Input
                  size="large"
                  name="articles"
                  placeholder="Search articles"
                  id="articles"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="searchAction">
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="button"
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </div>
            </div>
            {filterDataRemoved && articlesListByPreference?.length > 0 ? (
              <div className="newsDetailsHolder">
                <NewsList data={articlesListByPreference} />
              </div>
            ) : (
              saveNews &&
              saveNews?.length > 0 && (
                <div className="newsDetailsHolder">
                  <NewsList data={saveNews} />
                </div>
              )
            )}

            {/* saveNews && saveNews?.length > 0 && (
              <div className="newsDetailsHolder">
                <NewsList data={saveNews} />
              </div>
            ) */}
          </Col>
        </Row>
      </div>

      <></>
      {selectFilter.showModal && (
        <ModalContainer
          selectFilter={selectFilter}
          isModalOpen={selectFilter.showModal}
          setSelectFilter={setSelectFilter}
        >
          {selectFilter?.byDate && (
            <RangeDatepicker
              setSelectFilter={setSelectFilter}
              setSaveNews={setSaveNews}
              filters={searchQueries}
            />
          )}
          {selectFilter?.byCategory && (
            <CategoryFilter
              setSelectFilter={setSelectFilter}
              setSaveNews={setSaveNews}
              setSearchQueries={setSearchQueries}
              searchQueries={searchQueries}
            />
          )}
          {selectFilter?.bySource && (
            <SourceFilter
              setSelectFilter={setSelectFilter}
              setSaveNews={setSaveNews}
              setSearchQueries={setSearchQueries}
              searchQueries={searchQueries}
            />
          )}
        </ModalContainer>
      )}
      <></>
      <></>
    </div>
  );
};

export default News;

const categoryList = [
  "Technology",
  "Entertainment",
  "Health",
  "Sports",
  "Business",
  "Science",
];
