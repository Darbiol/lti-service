'use strict';

module.exports = function ( sequelize, DataTypes ) {

	return sequelize.define( 'Template', {

		'id' : {
			'type'         : DataTypes.UUID,
			'primaryKey'   : true,
			'defaultValue' : DataTypes.UUIDV4
		},

		'templateId' : {
			'type'          : DataTypes.INTEGER,
			'autoIncrement' : true,
			'unique'        : true
		},

		'name' : {
			'type'      : DataTypes.STRING,
			'allowNull' : false
		},

		'description' : {
			'type'      : DataTypes.STRING,
			'allowNull' : true
		},

		'content' : {
			'type'      : DataTypes.STRING,
			'allowNull' : false
		},

		'createdAt' : DataTypes.DATE,
		'updatedAt' : DataTypes.DATE,
		'deletedAt' : DataTypes.DATE

	}, {
		'paranoid' : true
	} );

};
