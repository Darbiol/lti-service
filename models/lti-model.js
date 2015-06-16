'use strict';

module.exports = function ( sequelize, DataTypes ) {

	return sequelize.define( 'Tctp_contract', {

		'id' : {
			'type'         : DataTypes.UUID,
			'primaryKey'   : true,
			'defaultValue' : DataTypes.UUIDV4
		},

		'consumer_key' : {
			'type'          : DataTypes.STRING,
			'unique'        : true,
			'allowNull'     : false
		},

		'secret' : {
			'type'      : DataTypes.STRING,
			'allowNull' : false
		},

		'description' : {
			'type'      : DataTypes.STRING,
			'allowNull' : true
		},

		'createdAt' : DataTypes.DATE,
		'updatedAt' : DataTypes.DATE,
		'deletedAt' : DataTypes.DATE

	}, {
		'paranoid' : true
	} );

};
