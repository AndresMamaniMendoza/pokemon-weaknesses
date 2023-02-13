import './App.css';
import { useState, useEffect } from 'react';
import './button.css';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const pokeApiDomain = `https://pokeapi.co/api/v2/pokemon/`;

  const [currentId, setCurrentId] = useState(1);
  const [pokemon, setPokemon] = useState({ sprites: {}, weight: 0, abilities: [] });
  const [loading, setLoading] = useState(false);
  const [weaknesses, setWeaknesses] = useState([]);

  useEffect(() => {
    fetch(`${pokeApiDomain}${currentId}`)
    .then(response => response.json())
    .then((data)=>{
      setCurrentId(data.id);
      setPokemon(data);

      const typeUrls = data.types.map(type => type.type.url);
      typeUrls.map((url) => fetch(url)
      .then((r)=>r.json())
      .then((res)=> setWeaknesses(res.damage_relations.double_damage_from)));
      setLoading(false)

    })
    .catch((err)=>
    console.log(err))
  }, [currentId]);

  const getPokemon = (id) => {
    setCurrentId(id);
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <></>
        ) : (
          <div>
            <div>
              <label>{pokemon.name}</label>
            </div>
            <div>
              <img src={pokemon.sprites.front_default} className="App-logo" alt="logo" />
            </div>
            <div>
              <button className="arrow-button left" onClick={() => getPokemon(currentId - 1)}></button>
              <button className="arrow-button right" onClick={() => getPokemon(currentId + 1)}></button>
            </div>
            <div>
              <label>Weight:</label>
              <br></br>
            </div>

            <div>
              <label>Abilities:</label>
              {
                pokemon.abilities.map(item => (
                  <div key={uuidv4()}>
                    <label>{item.ability.name}</label>
                  </div>
                ))
              }
            </div>

            <div>
            <label>Weaknesses:</label>
                {weaknesses.map(weakness => (
                  <div key={uuidv4()}>
                      <label>{weakness.name}</label>
                  </div>
                  
                ))}
            </div>

          </div>)
        }
      </header>
    </div>
  );
}

export default App;
