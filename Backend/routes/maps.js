const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const placesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const apiKey = "AIzaSyCdL4cw_-wypt03Y-7aj3fTEBewXmWtmwk";
  var location=req.query.location;
  location=`${location.lat},${location.lng}`

  // Construct the URL with query parameters
  const urlWithParams = `${placesUrl}?` +
    `keyword=grocery&` +
    `location=${encodeURIComponent(location)}&` + // Encode the location
    `radius=300&` +
    `rankby=prominence&` +
    `key=${apiKey}`;

  try {
    const response = await axios.get(urlWithParams);
    res.json(response.data);
    //Pass this data into place details by getting place id from response data, remove res.json later on
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;