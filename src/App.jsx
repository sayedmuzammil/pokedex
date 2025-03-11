import React, { useEffect, useState } from 'react';

import {
  Flex,
  Layout,
  Menu,
  Row,
  Col,
  Image,
  Typography,
  Button,
  Grid,
} from 'antd';
import PokemonList from './PokemonList';

const { Header, Content, Footer } = Layout;

const navBar = [
  { key: 1, label: 'Home' },
  { key: 2, label: 'Pokemon Type' },
];

const App = () => {
  const { lg } = Grid.useBreakpoint();
  return (
    <Layout>
      <Header
        style={{
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <div>
          <img
            src="/src/assets/logoPokemon.png"
            alt="Pokemon logo"
            style={{
              marginTop: '20px',
              height: '40px',
            }}
          />
        </div>
      </Header>

      <Content>
        <section>
          <Row
            justify="space-between"
            align="middle"
            style={{ height: '800px' }}
          >
            <Col
              span={12}
              xs={24}
              xl={12}
              style={{ paddingLeft: '140px' }}
            >
              <Flex vertical align="left" justify="space-evenly">
                <Typography.Title
                  level={2}
                  style={{
                    margin: 'auto',
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                    fontSize: '5vw',
                    color: '#42494D',
                  }}
                >
                  All the Pokémon data you'll ever need in one place!
                </Typography.Title>
                <Typography.Title level={3} style={{ color: 'gray' }}>
                  Thousands of data compiled into one place
                </Typography.Title>
              </Flex>
              <Button
                type="primary"
                href="https://pokemondb.net/pokedex/all"
                target="_blank"
                style={{
                  fontFamily: 'Poppins',
                  fontSize: '20px',
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
            <Col span={12} xs={0} xl={12}>
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
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: lg ? '10px 100px 30px 100px' : '16px',
            }}
          >
            <Row>
              <Col span={24}>
                <h1>Pokémon's List</h1>
              </Col>
            </Row>
            <PokemonList />
          </div>
          {/* Pokedex Header */}
        </section>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Pokémon API ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
