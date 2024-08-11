import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

export const configureSwagger = (app: any) => {
  const swaggerDocument = YAML.load(path.join(__dirname, '../docs/api.yaml'));
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
