import React from 'react';
import { Col, Image, Modal, Row } from 'antd';

const ModalPage = ({ isModalOpen, handleCancel, pokemon }) => {
  return (
    <>
      <Modal
        centered
        title={pokemon.id}
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        destroyOnClose
        width={800}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Image
                width="70%"
                preview={false}
                src={pokemon.image}
              />
            </div>
          </Col>
          <Col
            span={12}
            style={{
              fontSize: '40px',
              color: '#42494D',
            }}
          >
            <h3 style={{ marginBottom: '0', marginTop: '0' }}>
              {pokemon.name}
            </h3>
            <div>
              <Row gutter={[16, 16]}>
                <Col
                  span={6}
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginTop: '10px',
                  }}
                >
                  Weight:
                </Col>
                <Col
                  span={6}
                  style={{ fontSize: '20px', marginTop: '10px' }}
                >
                  {pokemon.weight}
                </Col>
                <Col
                  span={6}
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginTop: '10px',
                  }}
                >
                  Height:
                </Col>
                <Col
                  span={6}
                  style={{ fontSize: '20px', marginTop: '10px' }}
                >
                  {pokemon.height}
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col
                  span={6}
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginTop: '10px',
                  }}
                >
                  Abilities:
                </Col>
                <Col span={12}>
                  <ul
                    style={{
                      paddingLeft: '20px',
                      marginTop: '10px',
                    }}
                  >
                    {pokemon.abilities.map((a, index) => (
                      <li key={index}>{a.ability}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col
                  span={6}
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginTop: '10px',
                  }}
                >
                  Types:
                </Col>
                <Row gutter={[8, 8]} justify="center">
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
                          marginTop: '10px',
                        }}
                      >
                        {type.name}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Row>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ModalPage;
