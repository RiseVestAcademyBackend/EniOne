const express = require("express");
const router = express.Router();
const fs = require('fs');

// Loading the data from JSON files...
const artists = require('../data/artists.json');
const music = require('../data/music.json');


// Get all artists
router.get("/artists", (req, res) => {
    res.status(200).json(artists);
  });

//Get a particular artist given their ID
router.get('/artists/:artist_id', (req, res) => {
  const artistId = parseInt(req.params.artist_id); 
  const artist = artists.find(artist => artist.id === artistId);

  if (artist) {
    res.status(200).json(artist); 
  } else {
    res.status(404).json({ message: 'Artist not found' }); 
  }
});

// Get all music for a specific artist by artist_id
router.get('/artists/:artist_id/music', (req, res) => {
    const artistId = parseInt(req.params.artist_id); 
    const artistMusic = music.filter(track => track.artist_id === artistId); // Filter music by artist_id
  
    if (artistMusic.length > 0) {
      res.status(200).json(artistMusic); 
    } else {
      res.status(404).json({ message: 'No music found for this artist' });
    }
  });
  

//Add a new artist. POST
router.post('/artists', (req, res) => {
    const newArtist = {
      id: artists.length + 1,
      name: req.body.name,
      genre: req.body.genre,
      artist_img: req.body.artist_img
    };
    artists.push(newArtist);
    fs.writeFileSync('./data/artists.json', JSON.stringify(artists, null, 2));
    res.status(201).json(newArtist);
  });

//Add new music to an artist by their artists id. POST
router.post('/artists/:artist_id/music', (req, res) => {
    const artistId = parseInt(req.params.artist_id, 10); 
    const artist = artists.find(artist => artist.id === artistId); 
  
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
  
    const { title, album, album_cover, release_date } = req.body;
  
    // perform a simple validation
    if (!title || !album || !album_cover || !release_date) {
      return res.status(400).json({ message: 'Missing required music information' });
    }
  
    // Create a new music object
    const newMusic = {
      id: music.length + 1,
      artist_id: artistId,
      title, 
      album,
      album_cover,
      release_date
    };
  
    music.push(newMusic);
    fs.writeFileSync('./data/music.json', JSON.stringify(music, null, 2));

    res.status(201).json({ message: 'New music added successfully', music: newMusic });
  });
  
  
  //Add new field to all the artist rows. PUT
    router.put('/artists', (req, res) => {
    const { debut_year, social_media_handle } = req.body;

    const updatedArtists = artists.map(artist => {
        return {
        ...artist,
        debut_year: debut_year || null,
        socia_media_handle: socia_media_handle || 'UNKNOWN',
        };
    });
    fs.writeFileSync('./data/artists.json', JSON.stringify(updatedArtists, null, 2));

    res.status(200).json(updatedArtists); 
    });

// Update a field value of a particular artist. PUT
router.put('/artists/:artist_id', (req, res) => {
  const artistId = parseInt(req.params.id, 10);
  const artistIndex = artists.findIndex(artist => artist.id === artistId);

  if (artistIndex !== -1) {
    const updatedArtist = {
      ...artists[artistIndex], 
      name: req.body.name || artists[artistIndex].name, 
      genre: req.body.genre || artists[artistIndex].genre,
      artist_img: req.body.artist_img || artists[artistIndex].artist_img
    };

    artists[artistIndex] = updatedArtist;

    fs.writeFileSync('./data/artists.json', JSON.stringify(artists, null, 2));

    res.status(200).json(updatedArtist);
  } else {

    res.status(404).json({ message: 'Artist not found' });
  }
});

// Edit a specific music for a specific artist. PUT
    router.put('/artists/:artist_id/music/:music_id', (req, res) => {
    const artistId = parseInt(req.params.artist_id, 10);  
    const musicId = parseInt(req.params.music_id, 10);    
  
    const artist = artists.find(artist => artist.id === artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
  
    const musicIndex = music.findIndex(track => track.id === musicId && track.artist_id === artistId);
    if (musicIndex === -1) {
      return res.status(404).json({ message: 'Music track not found for this artist' });
    }
  
    // Update the music track with the provided data 
    const { title, album, album_cover, release_date } = req.body;
    const updatedMusic = {
      ...music[musicIndex], // Retain the existing fields
  // Update the field if provided, otherwise keep the existing
      title: title || music[musicIndex].title,  
      album: album || music[musicIndex].album,  
      album_cover: album_cover || music[musicIndex].album_cover,  
      release_date: release_date || music[musicIndex].release_date 
    };
  
    music[musicIndex] = updatedMusic;
  
    fs.writeFileSync('./data/music.json', JSON.stringify(music, null, 2));
  
    res.status(200).json({ message: 'Music track updated successfully', music: updatedMusic });
  });
  

//Delete all artists. DELETE
  router.delete('/artists', (req, res) => {
  const emptyArtists = [];

  fs.writeFileSync('./data/artists.json', JSON.stringify(emptyArtists, null, 2));

  res.status(200).json({ message: 'All artists have been deleted.' });
});

//Delete a specifi artist
    router.delete('/artists/:artist_id', (req, res) => {
    const artistId = parseInt(req.params.artist_id, 10);
    const artistIndex = artists.findIndex(artist => artist.id === artistId);

    if (artistIndex !== -1) {
        const deletedArtist = artists.splice(artistIndex, 1); 
        res.status(200).json({ message: 'Artist deleted successfully', artist: deletedArtist });
    } else {
        res.status(404).json({ message: 'Artist not found' });
    }
});

//Delete music under a specific artist
    router.delete('/artists/:artist_id/music', (req, res) => {
    const artistId = parseInt(req.params.artist_id, 10); 
    const artistIndex = artists.findIndex(artist => artist.id === artistId);

    if (artistIndex !== -1) {
        const artistMusic = music.filter(track => track.artist_id === artistId);

        if (artistMusic.length > 0) {
            // iterating backwards to avoid any errors from modifications...
            for (let i = music.length - 1; i >= 0; i--) {
                if (music[i].artist_id === artistId) {
                    music.splice(i, 1); 
                }
            }
            res.status(200).json({ message: 'Artist\'s music deleted successfully', deletedMusic: artistMusic });
        } else {
            res.status(404).json({ message: 'No music found for this artist' });
        }
    } else {
        res.status(404).json({ message: 'Artist not found' });
    }
});