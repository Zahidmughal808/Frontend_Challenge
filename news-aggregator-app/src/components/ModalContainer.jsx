import React from "react";
import { Modal } from "antd";

export default function ModalContainer({
  selectFilter,
  setSelectFilter,
  isModalOpen,
  children,
}) {
  const handleOk = () => {
    setSelectFilter({
      byDate: selectFilter?.byDate,
      byCategory: selectFilter?.byCategory,
      bySource: selectFilter?.bySource,
      showModal: false,
    });
  };
  const handleCancel = () => {
    setSelectFilter({
      byDate: selectFilter?.byDate,
      byCategory: selectFilter?.byCategory,
      bySource: selectFilter?.bySource,
      showModal: false,
    });
  };

  return (
    <Modal
      classNames="modalContainer"
      title="New's Filters"
      open={isModalOpen}
      okText={"Submit"}
      onOk={handleOk}
      footer={null}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      {children}
    </Modal>
  );
}
