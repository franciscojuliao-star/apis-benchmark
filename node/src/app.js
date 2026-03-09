const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const sequelize = require('./database');
const projetosRouter = require('./routes/projetos');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/projetos', projetosRouter);

const PORT = 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao PostgreSQL.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
      console.log(`Swagger em    http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco:', err.message);
  });
