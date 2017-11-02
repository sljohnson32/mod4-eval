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

// //API endpoints
// app.get('/api/v1/districts', (request, response) => {
//   let { countyID } = request.query;
//
//   const checkQuery = () => {
//     if (countyID) {
//       return database('districts').where('county_id', countyID).select();
//     } else {
//       return database('districts').select();
//     }
//   };
//
//   checkQuery()
//     .then((districts) => {
//       response.status(200).json(districts);
//     })
//     .catch((error) => {
//       response.status(500).json({error});
//     });
// });
//
//
// app.post('/api/v1/schools', (request, response) => {
//   const school = request.body;
//
//   for (let requiredParameter of ['name', 'school_code', 'student_count', 'teacher_count', 'student_teacher_ratio', 'district_id']) {
//     if (!school[requiredParameter]) {
//       return response
//         .status(422)
//         .send({ error: `Expected format: { name: <String>, school_code: <String>, student_count: <String>, techer_count: <String>, studetn_teacher_ratio: <String> }. You're missing a '${requiredParameter}' property.` });
//     }
//   }
//
//   database('schools').insert(school, 'id')
//     .then(school => {
//       response.status(201).json({ id: school[0] });
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });
//
//

app.listen(app.get('port'), () => {
  console.log(`Amazon-Bay is running on ${app.get('port')}.`);
});

module.exports = app;
