import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Card,
  Flex,
  Typography,
  Row,
  Col,
  Image,
  Pagination,
} from 'antd';
const { Header, Content, Footer } = Layout;

const items = [
  { key: 1, label: 'Home' },
  { key: 2, label: 'Pokemon Type' },
];

const cardStyle = {
  width: '100vh',
};

const idStyle = {
  fontSize: '20px',
  fontWeight: '800',
  color: '#B3B6B8',
  lineHeight: '20px',
  textAlign: 'left',
};

const nameStyle = {
  fontSize: '40px',
  fontWeight: '800',
  color: '#42494D',
  lineHeight: '60px',
  marginTop: '10px',
  marginBottom: '20px',
};

const typeStyle = {
  borderRadius: '50px',
  color: 'white',
  fontSize: '20px',
  fontWeight: 'bold',
};

const pokemonList = [
  {
    name: 'Charmander',
    id: '#001',
    img: '/src/assets/Charmander.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 2', backgroundColor: '#DE2C2C' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 4', backgroundColor: '#E34C88' },
    ],
  },
  {
    name: 'Squirtle',
    id: '#002',
    img: '/src/assets/Squirtle.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 5', backgroundColor: '#4350E6' },
      { name: 'Type 6', backgroundColor: '#FFAF66' },
    ],
  },
  {
    name: 'Bulbasaur',
    id: '#003',
    img: '/src/assets/Bulbasaur.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 5', backgroundColor: '#4350E6' },
      { name: 'Type 6', backgroundColor: '#FFAF66' },
    ],
  },
  {
    name: 'Charmander',
    id: '#001',
    img: '/src/assets/Charmander.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 2', backgroundColor: '#DE2C2C' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 4', backgroundColor: '#E34C88' },
    ],
  },
  {
    name: 'Squirtle',
    id: '#002',
    img: '/src/assets/Squirtle.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 5', backgroundColor: '#4350E6' },
      { name: 'Type 6', backgroundColor: '#FFAF66' },
    ],
  },
  {
    name: 'Bulbasaur',
    id: '#003',
    img: '/src/assets/Bulbasaur.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 5', backgroundColor: '#4350E6' },
      { name: 'Type 6', backgroundColor: '#FFAF66' },
    ],
  },
  {
    name: 'Charmander',
    id: '#001',
    img: '/src/assets/Charmander.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 2', backgroundColor: '#DE2C2C' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 4', backgroundColor: '#E34C88' },
    ],
  },
  {
    name: 'Squirtle',
    id: '#002',
    img: '/src/assets/Squirtle.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 5', backgroundColor: '#4350E6' },
      { name: 'Type 6', backgroundColor: '#FFAF66' },
    ],
  },
  {
    name: 'Bulbasaur',
    id: '#003',
    img: '/src/assets/Bulbasaur.png',
    type: [
      { name: 'Type 1', backgroundColor: '#E66D00' },
      { name: 'Type 3', backgroundColor: '#E34C88' },
      { name: 'Type 5', backgroundColor: '#4350E6' },
      { name: 'Type 6', backgroundColor: '#FFAF66' },
    ],
  },
];

const App = () => {
  const [poke, setPoke] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getPoke = async () => {
    await axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((res) => {
        setPoke(res);
      });
  };
  useEffect(() => {
    getPoke();
  }, []);
  const pokemonListing = poke?.data?.results;
  console.log(pokemonListing);

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          minHeight: '100vh',
          minWidth: '100vh',
        }}
      >
        <section>
          <Row
            justify="space-between"
            align="middle"
            style={{ height: '880px' }}
          >
            <Col span={12} style={{ paddingLeft: '140px' }}>
              <Flex vertical align="left" justify="space-evenly">
                <Typography.Title
                  level={2}
                  style={{
                    margin: 'auto',
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                    fontSize: '5em',
                    color: '#42494D',
                  }}
                >
                  'All the Pokémon data you'll ever need in one
                  place!'
                </Typography.Title>
                <Typography.Title level={3} style={{ color: 'gray' }}>
                  'Thousands of data compiled into one place'
                </Typography.Title>
              </Flex>
              <Button
                type="primary"
                href="https://pokemondb.net/pokedex/all"
                target="_blank"
                style={{
                  fontFamily: 'Poppins',
                  fontSize: '30px',
                  fontWeight: '700',
                  backgroundColor: '#E6AB09',
                  padding: '30px',
                  marginTop: '30px',
                  borderRadius: '20px',
                }}
              >
                Check Pokedex{' '}
              </Button>
            </Col>
            <Col span={12}>
              <div
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Image
                  width={'70%'}
                  preview={false}
                  src="/src/assets/pokemonStarterv1.png"
                />
              </div>
            </Col>
          </Row>
        </section>
        <section
          style={{
            backgroundColor: '#FFCB3B',
            textAlign: 'center',
            padding: '10px 100px 30px 100px',
          }}
        >
          {/* Pokedex Header */}
          <Row>
            <Col span={24}>
              <h1>Pokedex</h1>
              <p>All generating totalling</p>
              <p>999999 Pokemons</p>
            </Col>
          </Row>

          {/* Pokemon Grid */}
          <Row gutter={[16, 16]} wrap>
            {pokemonListing?.map((item) => (
              <Col span={8}>
                <Card>
                  <div>
                    <div>
                      <Image
                        width={'80%'}
                        preview={false}
                        src={item?.img}
                      />
                    </div>
                    <div align="left" style={idStyle}>
                      {item?.id}
                    </div>
                    <div>
                      <p align="left" style={nameStyle}>
                        {item?.name}
                      </p>
                    </div>
                    <div>
                      <Row gutter={[16, 16]} wrap>
                        {item?.type?.map((data, index) => {
                          const namePoke = data?.name;
                          const bgPoke = data?.backgroundColor;
                          return (
                            <Col span={12} key={index}>
                              <div
                                style={{
                                  backgroundColor: `${bgPoke}`,
                                  borderRadius: '50px',
                                  color: 'white',
                                  fontSize: '20px',
                                  fontWeight: 'bold',
                                }}
                              >
                                {namePoke}
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination align="end" defaultCurrent={1} total={50} />
        </section>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;
