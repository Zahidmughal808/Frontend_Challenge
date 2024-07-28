import React, { useState, useEffect } from "react";
import moment from "moment";

export default function NewsList({ data }) {
  const dateFormat = "YYYY-MM-DD h:mm:ss a";
  const [initialCount, setInitialCount] = useState(16);
  const [visibleNewsCard, setVisibleNewsCard] = useState(initialCount);

  useEffect(() => {
    setVisibleNewsCard(initialCount);
  }, [initialCount]);

  const showLessButton = visibleNewsCard === data?.length;
  const showMoreButton = data?.length > visibleNewsCard;

  const handleShowMore = () => {
    const dataLength = data?.length;
    setVisibleNewsCard(dataLength);
  };

  const handleShowLess = () => {
    setVisibleNewsCard(initialCount);
  };
  return (
    <div className={"newsListSection"}>
      <h2 className={"title"}>News List</h2>
      <ul className="listHolder">
        {data?.length &&
          data?.slice(0, visibleNewsCard)?.map((item, index) => {
            return (
              <li key={index}>
                <a href={item?.url} target="_blank" rel="noreferrer" alt="News">
                  <div className="carItem">
                    <div className="newsBrandImage">
                      <img
                        src={item?.urlToImage}
                        alt={item?.source?.name}
                        loading={"lazy"}
                      />
                    </div>
                    <></>
                    <div className="moreDetails">
                      <div className="autherName">Author: {item?.author}</div>
                      <div className="publishedDate">
                        Published at:{" "}
                        {moment(item?.publishedAt).format(dateFormat)}
                      </div>
                    </div>
                    <div className="cardOverlay">
                      <div className="overlayAutherName">
                        Author: {item?.author}
                      </div>
                      <div className="overlayNewsTitle">{item?.title}</div>
                      <div className="overlayNewsDescription">
                        {item?.description}
                      </div>
                    </div>
                    <></>
                  </div>
                </a>
              </li>
            );
          })}
      </ul>
      <></>
      <div className="actions">
        {showMoreButton && (
          <button onClick={handleShowMore} className={"seeAllLink"}>
            See More
            <span className={"arrowIcon"}>→</span>
          </button>
        )}
        {showLessButton && (
          <button onClick={handleShowLess} className={"seeAllLink"}>
            See Less
          </button>
        )}
      </div>
    </div>
  );
}
