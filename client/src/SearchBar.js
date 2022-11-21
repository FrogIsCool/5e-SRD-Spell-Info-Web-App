import React from 'react';
import './SearchBar.css';

/**
 * Search Bar component that takes input from user and filters the
 * spell list with it.
 */
function SearchBar(props) {
    const [input, setInput] = React.useState(""); // Store and set input from search box
    let spellList = props.spells; // The spell list passed in from parent
    let filteredList = props.spells; // A filtered version of spellList for filtering search results

    /**
     * When text is entered into search box, update input.
     * 
     * @param e Event of text box changing 
     */
    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    /**
     * If input is given, filter the spell list by it.
     */
    if (input.length > 0) {
        filteredList = spellList.filter((spell) => {
            return spell.name.toLowerCase().match(input.toLowerCase());
        });
    }

    /**
     * Render the search box and filtered spell list.
     */
    return (
        <section className='Search'>
            <h1>5e SRD Spell List</h1>
            <input className='SearchBox' type='text' onChange={handleInput} value={input} placeholder='Search...'/>
            <br/>
            {/* For each spell, create a link that routes to /:spell */}
            {filteredList.map((spell, index) =>
                <a href={spell.index} key={index}>{spell.name}<br/></a>
            )}
        </section>
    )
}


export default SearchBar;