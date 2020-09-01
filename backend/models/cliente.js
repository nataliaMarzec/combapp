'use strict'
const { Sequelize ,Op,Model} = require('sequelize');



module.exports = function(sequelize,DataTypes) {
	const Cliente = sequelize.define('Cliente',{
   
    nombre: DataTypes.STRING,


    apellido: DataTypes.STRING,


    cuit: DataTypes.INTEGER,


    razonSocial: DataTypes.STRING,


    telefono: DataTypes.INTEGER,


    email: DataTypes.STRING,
		
     
		
		
		},
	    
	{
	
		tableName: 'Clientes',
		modelName: 'Cliente'
		},
      
    );
      
        Cliente.associate = models => {
    
          


          
		},
     
       console.log("SOY CLIENTE:",Cliente === sequelize.models.Cliente);   

	    return Cliente;
    };

	
	






