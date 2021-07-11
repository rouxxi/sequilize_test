import Sequelize from 'sequelize';

// const {DATABASE, DATABASE_USER, DATABASE_PASSWORD} = process.env;

// Problème lors de l'utilisation des variable d'environnement das la déclaration de l'instance sequelize
const sequelize = new Sequelize(
  'sequelize',
  'gwen',
  'Trisomique123!',
  {
    dialect: 'postgres',
  },
);
 
const models = {
  User: sequelize.import("../user/user") ,//require(path.join('../user/user', 'user'))(sequelize, Sequelize.DataTypes), // dépreccier en version 6 de sequelize  => sequelize.import("./user"),
  Message:sequelize.import("../message/message") //require(path.join('../message/message', 'message'))(sequelize, Sequelize.DataTypes), // dépreccier en version 6 de sequelize  => sequelize.import("./message"),
};
 
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
 
export { sequelize };
 
export default models;