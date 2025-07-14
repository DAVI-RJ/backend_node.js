import Sequelize, { Model} from "sequelize"; 


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
      tableName: "addresses",
      timestamps: true,
      underscored: true
    });
  }
  static associate(models){
    this.hasMany(models.Companies);
    this.hasMany(models.Suppliers);
  }
}

export default Address; 