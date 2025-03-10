import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { Row, Col, Pagination } from 'antd';
import axios from 'axios';

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

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Function to get Pokemon data
    const fetchPokemon = async () => {
      try {
        // Step 1: Get list of Pokémon (limit 10)
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${
            (currentPage - 1) * pageSize
          }&limit=${pageSize}`
        );

        // Step 2: Get the list of Pokemon names & URLs
        // API response save in "results":[{name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"}]
        const pokemonList = response.data.results;
        setTotal(response.data.count);

        // Step 3: Prepare array to save all the pokemon
        let detailedPokemon = [];

        for (let pokemon of pokemonList) {
          const res = await axios.get(pokemon.url); // Get detailed data
          const pokeInfo = res.data;
          //console.log(pokeInfo);

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
            weight: pokeInfo.weight,
            height: pokeInfo.height,
            abilities: pokeInfo?.abilities?.map((a) => ({
              ability: a.ability.name,
            })),
          };

          // Add the formatted Pokémon data to our list
          detailedPokemon.push(pokemonData);
          console.log(detailedPokemon);
        }

        // Step 5: Save the Pokémon list in state
        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {/* Show all PokemonCard */}
        {pokemonList.map((pokemon) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={6} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        showSizeChanger
        align="center"
        style={{ marginTop: '10px' }}
      />
    </>
  );
};

export default PokemonList;
