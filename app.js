const express = require('express')
const fetch = require('node-fetch')
const path = require('path');
const app = express()
const admin = require('firebase-admin');

app.use('/', express.static(path.join(__dirname, 'client/build')));

// Firebase starter code appears below
let serviceAccount = require('./swe-432-hw3-fb190-firebase-adminsdk-2svx9-20c966185c');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

/**
 * Collects spell data from 3rd party api and adds it to the database.
 */
 class Spells {
  /**
   * Fills the database with the collected spell data.
   */
  constructor() {
    this.spellList = []; 
    this.dbSetUp();
  }

  /**
   * Fetch the list of spells from the api and use that list to asyncronously
   * fetch the data for each spell and store the results.
   */
  async getData() {
    this.spellList = await fetch('https://www.dnd5eapi.co/api/spells').then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error fetching');
    })
    .catch((error) => {
      console.log(error);
    });
    
    let promises = [];
    for(let spell of this.spellList.results) {
      promises.push(fetch('https://www.dnd5eapi.co/api/spells/' + spell.index));
    }
    this.spellList = await Promise.all(promises);
  }

  /**
   * Converts the spell list fetches to json format.
   */
  async toJson() {
    let promises = [];
    for(let spell of this.spellList) {
      promises.push(spell.json());
    }
    this.spellList = await Promise.all(promises);
  }

  /**
   * Fetches spell data from 3rd party api and stores it in the app's
   * firebase database for persistence.
   */
  async dbSetUp() {
    await this.getData();
    await this.toJson();
    
    for(let spell of this.spellList) {
      db.collection('spells').doc(spell.index).set(spell);
    }
  }
}

const spellsObj = new Spells();

/**
 * Endpoint for all spells from the database.
 */
app.get('/spells', (req, res) => {
  db.collection('spells').get().then((spells) =>
    res.send(spells.docs.map(doc => doc.data()))
  );
});

/**
 * Endpoint for a specific spell.
 */
app.get('/spell/:spell', (req, res) => {
  db.collection('spells').doc(req.params.spell).get().then((spell) =>
    res.send(spell.data())
  );
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;