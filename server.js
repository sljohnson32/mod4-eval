const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

//Client-side endpoint
app.get('/', (request, response) => {
  response.sendfile('index.html');
});

// API ENDPOINTS

//Inventory GET endpoint
app.get('/api/v1/inventory', (request, response) => {

  database('inventory').select()
    .then(inventory => {
      response.status(200).json(inventory);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

//Order History Endpoints

app.get('/api/v1/order_history', (request, response) => {

  database('order_history').select()
    .then(history => {
      response.status(200).json(history);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

app.post('/api/v1/order_history', (request, response) => {
  const order = request.body;
  console.log(order)

  if (!order.cost) {
    return response.status(422)
      .send({ error: `Expected format: { cost: <Decimal> }. You did not include the cost as a property in your request.` });
  }

  database('order_history').insert(order, 'id')
    .then(order => {
      response.status(201).json({ id: order[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});



app.listen(app.get('port'), () => {
  console.log(`Amazon-Bay is running on ${app.get('port')}.`);
});

module.exports = app;
