import React from 'react';
import { Modal } from 'antd';

const ModalPage = ({ isModalOpen, handleCancel, pokemon }) => {
  return (
    <>
      <Modal
        centered
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div>
          {pokemon.id}
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </Modal>
    </>
  );
};

export default ModalPage;
