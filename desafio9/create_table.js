const { options } = require('./options/mariaDB.js')
const knex = require('knex')(options)

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('name')
    table.string('modelo')
    table.string('referencia')
    table.integer('precio')
    table.datetime('fechahora')
}).then(() =>{
    console.log('Tabla Creada');
}).catch((err) => {
    console.log(err);
    throw err
}).finally(()=>{
    knex.destroy;
});

knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('nameChat')
    table.string('mensaje')
    table.datetime('fechahora')
}).then(() =>{
    console.log('Tabla Creada');
}).catch((err) => {
    console.log(err);
    throw err
}).finally(()=>{
    knex.destroy;
});