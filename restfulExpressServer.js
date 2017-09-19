var http = require('http')
var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/pets', function(req, res, next) {
  fs.readFile('./pets.json', 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }


    let pets = JSON.parse(petsJSON)
    res.send(pets)
    //console.log(pets)

  });
})

app.get('/pets/:id', function(req, res) {
  let id = req.params.id

  fs.readFile('./pets.json', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }

    let pets = JSON.parse(data)

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');

      return;
    }

    res.send(pets[id])
  })
})

app.post('/pets', function(req, res, next) {
  fs.readFile('./pets.json', 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    if (Number.isNaN(req.body.age) || !req.body.kind || !req.body.name) {
      return res.sendStatus(400);
    }

    let pets = JSON.parse(petsJSON)

    let newobj = {}
    newobj['name'] = req.body.name
    newobj['age'] = req.body.age
    newobj['kind'] = req.body.kind

    pets.push(newobj)

    fs.writeFile('./pets.json', JSON.stringify(pets), function() {
      res.send(newobj)
    })

  });
})

app.patch('/pets/:id', function(req, res, next) {
  fs.readFile('./pets.json', 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    var id = req.params.id

    let pets = JSON.parse(petsJSON)

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');

      return;
    }

    let pet = pets[id]

    let age = Number.parseInt(req.body.age);
    let kind = req.body.kind;
    let name = req.body.name;

    if (!Number.isNaN(age)) {
      pet.age = age;
    }

    if (kind) {
      pet.kind = kind;
    }

    if (name) {
      pet.name = name;
    }

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', newPetsJSON, function() {
      res.send(pet)
    })

  });
})

app.delete('/pets/:id', function(req, res) {

  fs.readFile('./pets.json', 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    let id = req.params.id

    let pets = JSON.parse(petsJSON)

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');

      return;
    }

    let pet = pets.splice(id, 1)[0];
    let newPetsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', newPetsJSON, function() {
      res.send(pet)
    })

  })



})

app.listen(8000, function() {
  console.log('Server listening on port 8000')
})

module.exports = app;
