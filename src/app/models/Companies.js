import Sequelize, { Model } from "sequelize";

class Companies extends Model {
  static init(sequelize) {
    super.init({
      cnpj: Sequelize.STRING(18),
      name: Sequelize.STRING(100),
      email: Sequelize.STRING(100),
      phone: Sequelize.STRING(18),
      status: Sequelize.ENUM("active", "inactive", "canceled"), 
    },
    {
      sequelize,
    });
  }
  static associate(models){
    this.belongsTo(models.Addresses);
  }
}

export default Companies; 