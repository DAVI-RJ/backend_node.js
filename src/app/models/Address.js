import Sequelize, { Model } from "sequelize"; 


class Address extends Model {
  static init (sequelize){
    super.init ({
      street: Sequelize.STRING,
      number: Sequelize.STRING, 
      neighborhood: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING, 
      zip: Sequelize.STRING
    },
    {
      sequelize,
    });
  }
  static associate(models){
    this.hasMany(models.Companies);
  }
}

export default Address; 