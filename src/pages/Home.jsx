import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Skeletons } from "../components/Skeletons";
import Pagination from "@mui/material/Pagination";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, [currentPage]);

  const getPokemons = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = start + itemsPerPage - 1;
    var endpoints = [];
    for (var i = start; i <= end; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile");
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageCount = Math.ceil(899 / itemsPerPage);

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                  <PokemonCard name={pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1)} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
        <Box sx={{mt: 4, mb: 3, display: "flex", justifyContent: "center", color: 'white'}}>
          <Pagination 
            count={pageCount} 
            page={currentPage} 
            onChange={handleChange} 
            color="primary" 
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
              },
              '& .Mui-selected': {
                backgroundColor: 'white',
                color: 'black',
              },
              '& .MuiPaginationItem-icon': {
                color: 'white',
              },
            }}
          />
        </Box>
      </Container>
    </div>
  );
};
