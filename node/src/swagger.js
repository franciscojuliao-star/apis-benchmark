const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Projetos',
      version: '1.0.0',
      description: 'API REST para gerenciamento de projetos',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Projeto: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            titulo:      { type: 'string',  example: 'Sistema de Gestão' },
            coordenador: { type: 'string',  example: 'Prof. João Silva' },
            curso:       { type: 'string',  example: 'Engenharia de Software' },
            ano:         { type: 'integer', example: 2024 },
            status:      { type: 'string',  enum: ['ativo', 'finalizado'], example: 'ativo' },
          },
        },
        ProjetoInput: {
          type: 'object',
          required: ['titulo', 'coordenador', 'curso', 'ano'],
          properties: {
            titulo:      { type: 'string',  example: 'Sistema de Gestão' },
            coordenador: { type: 'string',  example: 'Prof. João Silva' },
            curso:       { type: 'string',  example: 'Engenharia de Software' },
            ano:         { type: 'integer', example: 2024 },
            status:      { type: 'string',  enum: ['ativo', 'finalizado'], example: 'ativo' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
