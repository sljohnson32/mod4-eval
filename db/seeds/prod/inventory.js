const inventory = require('../../../data/inventory')

const createInventory = (knex, item) => {

  let price = parseFloat(item.price);

  return knex('inventory').insert({
    title: item.title,
    description: item.description,
    image_url: item.image_url,
    price: price
  })
    .catch(error => console.log(`Error seeding inventory data: ${error}`));
};


exports.seed = function(knex, Promise) {
  return knex('inventory').del()
    .then(() => {
      let seedPromises = [];

      inventory.forEach(item => {
        seedPromises.push(createInventory(knex, item));
      });

      return Promise.all(seedPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
