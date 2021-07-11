import express from 'express';
import models, {sequelize} from './models/index';

const app = express();


const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
  
  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );


};

const eraseDatabaseOnSync = true;
 
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if(eraseDatabaseOnSync) {
    createUsersWithMessages()
  }
  
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});


/*
Pour lancer simplement la DB 
sequelize.sync().then(() => {
    app.listen(process.env.PORT, ()=> {
        console.log(`exmple wesh on the port ${process.env.PORT}`)
    })
})





Pour réinitialiser la DB sur chaque lancement de serveur


const eraseDatabaseOnSync = true;
 
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

*/