const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '61808a38d46e2de59f631e43',
            image: 'https://source.unsplash.com/collection/483251/',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam libero mollitia neque facere.Nihil voluptatem pariatur facere dolor deleniti ut quasi ex eius cum sunt perferendis, quaerat hic quia assumenda possimus molestias, aliquam a officiis eveniet, harum tempore ratione excepturi? Unde voluptatibus ab cum non veniam quam, tenetur fugit est.',
            price
        })
        await camp.save()
    }

}

seedDb().then(() => {
    mongoose.connection.close();
});