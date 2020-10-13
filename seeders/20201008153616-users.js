'use strict';

const users = [
  {
    email:'juansecorrea@mail.com',
    first_name:'sebastian',
    last_name:'villegas',
    password:'juan12345',
    token:'AHJKHDJ323',
    active: false,
    created_at:new Date(),
    updated_at: new Date()
  },
  {
    email:'thomas@mail.com',
    first_name:'thomas',
    last_name:'muñoz',
    password:'thomas12',
    token:'ABC345',
    active: false,
    created_at:new Date(),
    updated_at: new Date()
  }
];
const roles = [
  {
    name:'Administrador',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name:'Cliente',
    created_at: new Date(),
    updated_at: new Date()
  }
];
let user_roles = [
  {
    user_id: 2,
    role_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let rolesR = await queryInterface.bulkInsert('roles', roles, {returning: true});
    let usersR = await queryInterface.bulkInsert('users', users, {returning: true});
    let {id: adminRolID} = rolesR.find(rol => rol.name === 'Administrador');
    let {id: userId} = usersR.find(user => user.email === 'juansecorrea@mail.com');
    user_roles[0].user_id = userId;
    user_roles[0].role_id = adminRolID;
    let usersRolesR = await queryInterface.bulkInsert('user_roles', user_roles, {returning: true});
    console.log(rolesR, usersR, usersRolesR);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
