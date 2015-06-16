'use strict';

module.exports = {
  'up' : function ( migration, DataTypes, done ) {
  	migration
  		.createTable( 'tctp_contract' );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  'down' : function ( migration, DataTypes, done ) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
