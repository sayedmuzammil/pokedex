import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Image,
  Typography,
  Button,
} from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const navBar = [
  { key: 1, label: 'Home' },
  { key: 2, label: 'Pokemon Type' },
];

// Function to get color based on type
const getTypeColor = (type) => {
  const typeColors = {
    fire: '#E66D00',
    water: '#0099FF',
    grass: '#01B956',
    poison: '#A040A0',
    flying: '#A890F0',
    electric: '#FFD700',
    normal: '#A8A878',
  };

  return typeColors[type] || '#999'; // Default color if type not found
};

const PokemonCard = ({ pokemon }) => {
  return (
    <Card hoverable style={{ textAlign: 'center' }}>
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
  );
};

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    // Function to get Pokemon data
    const fetchPokemon = async () => {
      try {
        // Step 1: Get list of Pokémon (limit 10)
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=10'
        );

        // Step 2: Get the list of Pokemon names & URLs
        // API response save in "results":[{name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"}]
        const pokemonList = response.data.results;

        // Step 3: Prepare array to save all the pokemon
        let detailedPokemon = [];

        for (let pokemon of pokemonList) {
          const res = await axios.get(pokemon.url); // Get detailed data
          const pokeInfo = res.data;
          console.log(pokeInfo);

          // Step 4: Format the data to be easier to use
          const pokemonData = {
            id: `#${pokeInfo.id.toString().padStart(3, '0')}`, // Format ID as #001
            name:
              pokeInfo.name.charAt(0).toUpperCase() +
              pokeInfo.name.slice(1), // Capitalize name
            image:
              pokeInfo.sprites.other['official-artwork']
                .front_default, // Get image from "sprites -> other -> official-artwork -> front_default"
            types: pokeInfo.types.map((t) => ({
              name: t.type.name, // Pokémon type (fire, water, etc.)
              color: getTypeColor(t.type.name), // Get color based on type
            })),
          };

          // Add the formatted Pokémon data to our list
          detailedPokemon.push(pokemonData);
        }

        // Step 5: Save the Pokémon list in state
        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

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
          items={navBar}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>

      <Content style={{ padding: '20px' }}>
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
        <section>
          <Row gutter={[16, 16]}>
            {/* Show all PokemonCard */}
            {pokemonList.map((pokemon) => (
              <Col xs={24} sm={12} md={8} lg={6} key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </Col>
            ))}
          </Row>
        </section>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Pokémon API ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
