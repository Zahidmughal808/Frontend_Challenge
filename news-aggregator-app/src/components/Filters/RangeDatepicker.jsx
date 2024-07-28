import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import cogoToast from "cogo-toast";
import moment from "moment";
import { getNewFromRange } from "../../services/NewsAPIService/NewsAPIService";

export default function RangeDatepicker({
  setSelectFilter,
  setSaveNews,
  filters,
}) {
  const [dateRange, setDateRage] = useState({
    fromDate: "",
    toDate: "",
  });
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";

  const onCalendarChange = (dates, dateStrings, info) => {
    const formattedStart = dateStrings[0];
    const formattedEnd = dateStrings[1];
    setDateRage({ fromDate: formattedStart, toDate: formattedEnd });
  };

  const handleSubmit = async () => {
    try {
      if (dateRange) {
        const result = await getNewFromRange(filters, dateRange);
        console.log('result --------', result)
        if (result?.status === 200) {
          result?.data?.articles?.length > 0 &&
            setSaveNews(result?.data?.articles);
          setSelectFilter({
            byDate: "",
            byCategory: "",
            bySource: "",
            showModal: false,
          });
        } else if (result?.status === 'error'){
          cogoToast.error(
            result?.error.message,
            { position: "top-right" },
            { hideAfter: 10 }
          );
        }
        setSelectFilter({
          byDate: "",
          byCategory: "",
          bySource: "",
          showModal: false,
        });
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
    <div>
      <div className="formField">
        <label htmlFor="fromDate">Select From Date</label>
        <RangePicker
          onCalendarChange={onCalendarChange}
          format={dateFormat}
          disabledDate={(val) => {
            return (
              moment().add(0, "days") <= val ||
              moment().add(0, "month") <= val ||
              moment().add(0, "years") <= val
            );
          }}
        />
      </div>
      <div className="rangeDateAction">
        <Button
          type="primary"
          size="large"
          block
          htmlType="button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
