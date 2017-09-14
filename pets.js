const fs = require('fs')
const path = require('path')

const node = path.basename(process.argv[0])
const file = path.basename(process.argv[1])
const cmd = process.argv[2]


if (process.argv.length == 2) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
}

if (process.argv[2] == "read") {
  if (process.argv.length == 3) {
    fs.readFile('./pets.json', function read(err, data) {
      if (err) {
        throw err;
      }

      let pets = JSON.parse(data)
      console.log(pets)
      process.exit()
    })
  }


  if (process.argv.length == 4) {
    let index = process.argv[3]
    fs.readFile('./pets.json', function read(err, data) {
      if (err) {
        throw err
      }

      let content = JSON.parse(data.toString())
      if (index > content.length - 1 || index < 0) {
        console.error('Usage: node pets.js read INDEX')
        process.exit(1)
      }

      console.log(content[index])

    })
  }
}

if (process.argv[2] == 'create') {
  if (process.argv.length == 6) {
    fs.readFile('./pets.json', function read(err, data) {
      if (err) {
        throw err
      }
      let content = JSON.parse(data)
      let newobj = {}

      newobj['age'] = Number.parseInt(process.argv[3])
      newobj['kind'] = process.argv[4].toString()
      newobj['name'] = process.argv[5].toString()
      content.push(newobj)
      console.log(newobj)

      fs.writeFile('./pets.json', JSON.stringify(content), function() {

      })
    })
  }
  else {
    console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`)
    process.exit(1)
  }
}
