const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/grocers', async (req, res) => {
  const placesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const apiKey = "AIzaSyCdL4cw_-wypt03Y-7aj3fTEBewXmWtmwk";
  var location=req.query.location;
  location=`${location.lat},${location.lng}`

  // Construct the URL with query parameters
  const urlWithParams = `${placesUrl}?` +
    `keyword=grocery&` +
    `location=${encodeURIComponent(location)}&` + // Encode the location
    `radius=400&` +
    `rankby=prominence&` +
    `key=${apiKey}`;

  try {
    const response = await axios.get(urlWithParams);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/details', async (req, res) => {
  const detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json";
  const apiKey = "AIzaSyCdL4cw_-wypt03Y-7aj3fTEBewXmWtmwk";
  var locationid=req.query.place_id;
 

  // Construct the URL with query parameters
  const detailsurlWithParams = `${detailsUrl}?` +
    `place_id=${locationid}&` + 
    `key=${apiKey}`;

  try {
    const response = await axios.get(detailsurlWithParams);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



