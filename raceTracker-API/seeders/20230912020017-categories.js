'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "categories",
      [
        {
    name: "Campeonato SimasTUrbo",
    description: "Campeonato da Oficina do Seu Simas ",
    created_at: new Date(),
    updated_at: new Date()
  }
],
{}
);
  },
  down () {}
};
