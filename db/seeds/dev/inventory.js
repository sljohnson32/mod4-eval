const inventory = require('../../../data/inventory')
const orderHistory = require('../../../data/order_history')

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

const createOrderHistory = (knex, order) => {

  let cost = parseFloat(order.cost);

  return knex('order_history').insert({
    cost: cost
  })
    .catch(error => console.log(`Error seeding order history data: ${error}`));
};



exports.seed = function(knex, Promise) {
  return knex('inventory').del()
    .then(() => knex('order_history').del())
    .then(() => {
      let seedPromises = [];

      inventory.forEach(item => {
        seedPromises.push(createInventory(knex, item));
      });
      orderHistory.forEach(order => {
        seedPromises.push(createOrderHistory(knex, order));
      });

      return Promise.all(seedPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
