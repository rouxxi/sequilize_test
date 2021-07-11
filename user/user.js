const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
    //dans une relation 1(user):N(message)
    User.associate = models => {
      User.hasMany(models.Message, { onDelete: 'CASCADE'/*crée une suppréssion de tous les extend*/})
    };
    // méthode pour trouver un user par login email/login
    User.findByLogin = async login => {
      let user = await User.finOne({
        where: { username: login},
      });

      if (!user) {
        user = await User.findOne({
          were: {email: login},
        })
      };
    }
   
    return User;
  };
   
  export default user;