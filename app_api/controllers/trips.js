const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// return all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips) {
            return res.status(404).json({ message: 'No trips found' });
        }

        return res.status(200).json(trips);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

// return one trip by its code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.find({ code: req.params.tripCode }).exec();

        if (!trip || trip.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
