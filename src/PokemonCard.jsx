import React, { useState } from 'react';

import { Row, Col, Card, Image, Typography, Modal } from 'antd';
import ModalPage from './ModalPage';

const { Title } = Typography;

const PokemonCard = ({ pokemon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [, forceUpdate] = useState();

  const handleCancel = () => {
    console.log('Closing modal...');
    setIsModalOpen(false);
    forceUpdate({}); // Forces React to re-render
  };
  return (
    <>
      {' '}
      {/* // Fragement */}
      <Card
        hoverable
        style={{ textAlign: 'center', minHeight: 320 }}
        onClick={showModal}
      >
        {/* Get the image based for each pokemon*/}
        <Image width="80%" preview={false} src={pokemon.image} />

        {/* Get the ID based for each pokemon*/}
        <div
          style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#B3B6B8',
          }}
        >
          {pokemon.id}
        </div>

        {/* Get the name based for each pokemon*/}
        <Title
          level={3}
          style={{ marginTop: '10px', color: '#42494D' }}
        >
          {pokemon.name}
        </Title>
        <Row gutter={[8, 8]} justify="center">
          {/* Get the type based for each pokemon*/}
          {pokemon.types.map((type, index) => (
            <Col key={index}>
              <div
                style={{
                  backgroundColor: type.color,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {type.name}
              </div>
            </Col>
          ))}
        </Row>
      </Card>
      {/* Pass props to ModalPage */}
      <ModalPage
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        pokemon={pokemon}
      />
    </>
  );
};

export default PokemonCard;
