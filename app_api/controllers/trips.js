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

// add a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res.status(201).json(newTrip);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};

// update an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(201).json(updatedTrip);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};

// delete an existing trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        }).exec();

        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(204).send();
    }
    catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
