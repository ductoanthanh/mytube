export const swaggerConfig = {
  swagger: '2.0',
  info: {
    version: '3.0.0',
    title: 'Mytube',
    description: 'Mytube API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001/api/v1',
    },
  ],
};
