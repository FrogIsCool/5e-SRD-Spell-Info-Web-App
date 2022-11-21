import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar';

/**
 * Main body and functionality for the spells app.
 */
class App extends Component {
  state = { spells: [] }

  componentDidMount() {
    this.getSpells();
  }

  /**
   * Retrieve spells from our /spells endpoint.
   */
  async getSpells() {
    let spellList = await fetch('/spells');
    spellList = await spellList.json();
    this.setState({ spells: spellList });
  }
  
  /**
   * Render the search bar and matching spells.
   */
  render() {
    const { spells } = this.state;
    return (
      <main className="App">
        <nav>
          {/* TODO: Add Nav bar */}
        </nav>
        {/* Render the spells*/}
        <section className='Search'>
          <SearchBar spells={spells}/>
        </section>
      </main>
    );    
  }
}

export default App;
