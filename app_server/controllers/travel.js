const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

// get trip data from the API
const travel = async (req, res) => {
  fetch(tripsEndpoint, options)
    .then(response => response.json())
    .then(json => {
      // make sure the API returned a list of trips
      if (!Array.isArray(json)) {
        return res.status(500).send('API response was not a trip list.');
      }

      if (json.length === 0) {
        return res.status(404).send('No trips found.');
      }

      res.render('travel', {
        title: 'Travlr Getaways',
        trips: json
      });
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  travel
};
