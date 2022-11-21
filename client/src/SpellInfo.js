import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './SpellInfo.css';

/**
 * React component for displaying individual spell information.
 */
function SpellInfo() {
  const { spell } = useParams();
  const [spellData, setSpellData] = React.useState([]);

  /**
   * Fetch spell data from our endpoint on component load.
   */
  useEffect(() =>{
    fetch("/spell/" + spell)
      .then(res => res.json())
      .then(res => setSpellData(res));
  },[spell])

  /**
   * Render spell data categories and values.
   */
  return (
    <section className='SpellInfo'>
      {/* TODO Spell info needs minor formatting fixes */}
      <h2>{spellData.name}</h2>
      <div><b>Level:</b> {spellData.level}</div>
      {/* <div><b>School:</b> {spellData.school.name}</div> TODO create fix that allows accessing elements before they are fetched */}
      <div><b>Casting Time:</b> {spellData.casting_time}</div>
      <div><b>Range:</b> {spellData.range}</div>
      <div><b>Duration:</b> {spellData.duration}</div>
      <div><b>Concentration:</b> {String(spellData.concentration)}</div>
      <div><b>Components:</b> {spellData.components} {spellData.material}</div>
      <div><b>Description:</b> {spellData.desc}</div>
      <div><b>Casting at Higher Levels:</b> {spellData.higher_level}</div>
    </section>
  )
}

export default SpellInfo;