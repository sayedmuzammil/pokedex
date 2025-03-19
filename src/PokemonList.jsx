import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { Row, Col, Pagination, Radio, Select, Spin } from 'antd';
import axios from 'axios';

const getTypeColor = (type) => {
  const typeColors = {
    fire: '#E66D00',
    water: '#0099FF',
    grass: '#01B956',
    poison: '#A040A0',
    flying: '#A890F0',
    electric: '#FFD700',
    normal: '#A8A878',
    fighting: '#C03028',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
  };
  return typeColors[type] || '#999';
};

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filterType, setFilterType] = useState('fire');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [typeData, setTypeData] = useState([]);

  const changeType = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  //get all pokemon from the selected type
  useEffect(() => {
    const fetchPokemonByType = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${filterType}`
        );
        const typeOfPokemon = response.data.pokemon;

        setTotal(typeOfPokemon.length);
        setTypeData(typeOfPokemon);

        await loadPokemonPage(typeOfPokemon, 1, pageSize);
      } catch (error) {
        console.log('error fetching Pokemon', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonByType();
  }, [filterType]);

  useEffect(() => {
    if (typeData.length > 0) {
      loadPokemonPage(typeData, currentPage, pageSize);
    }
  }, [currentPage, pageSize]);

  const loadPokemonPage = async (pokemonData, page, size) => {
    setLoading(true);
    try {
      const startIndex = (page - 1) * size;
      const endIndex = Math.min(
        startIndex + size,
        pokemonData.length
      );

      const pageData = pokemonData.slice(startIndex, endIndex);

      let detailedPokemon = [];
      for (let pokemon of pageData) {
        const res = await axios.get(pokemon.pokemon.url);
        const pokeInfo = res.data;

        const pokemonData = {
          id: `#${pokeInfo.id.toString().padStart(3, '0')}`,
          name:
            pokeInfo.name.charAt(0).toUpperCase() +
            pokeInfo.name.slice(1),
          image:
            pokeInfo.sprites.other['official-artwork'].front_default,
          types: pokeInfo.types.map((t) => ({
            name: t.type.name,
            color: getTypeColor(t.type.name),
          })),
          weight: pokeInfo.weight,
          height: pokeInfo.height,
          abilities: pokeInfo?.abilities?.map((a) => ({
            ability: a.ability.name,
          })),
        };
        detailedPokemon.push(pokemonData);
      }
      setPokemonList(detailedPokemon);
    } catch (error) {
      console.log('Error loading page', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Radio.Group
        value={filterType}
        onChange={changeType}
        style={{ marginBottom: '20px' }}
      >
        <Radio.Button value="fire">Fire</Radio.Button>
        <Radio.Button value="water">Water</Radio.Button>
        <Radio.Button value="grass">Grass</Radio.Button>
        <Radio.Button value="poison">Poison</Radio.Button>
        <Radio.Button value="flying">Flying</Radio.Button>
        <Radio.Button value="electric">Electric</Radio.Button>
        <Radio.Button value="normal">Normal</Radio.Button>
        <Radio.Button value="fighting">Fighting</Radio.Button>
        <Radio.Button value="ground">Ground</Radio.Button>
        <Radio.Button value="rock">Rock</Radio.Button>
        <Radio.Button value="bug">Bug</Radio.Button>
        <Radio.Button value="ghost">Ghost</Radio.Button>
        <Radio.Button value="steel">Steel</Radio.Button>
        <Radio.Button value="psychic">Psychic</Radio.Button>
        <Radio.Button value="ice">Ice</Radio.Button>
        <Radio.Button value="dragon">Dragon</Radio.Button>
        <Radio.Button value="dark">Dark</Radio.Button>
        <Radio.Button value="fairy">Fairy</Radio.Button>
      </Radio.Group>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {pokemonList.map((pokemon) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              key={pokemon.id}
            >
              <PokemonCard pokemon={pokemon} />
            </Col>
          ))}
        </Row>
      )}

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={['12', '24', '36', '48', '60']}
        width="80%"
        align="left"
        style={{ marginTop: '20px' }}
        disable={loading}
      />

      <div align="right" width="20%">
        {total}
      </div>
    </>
  );
};

export default PokemonList;
