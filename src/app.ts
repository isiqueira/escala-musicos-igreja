// src/app.ts
import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { ZodTypeProvider, validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import { scheduleRoutes } from './routes/schedule.routes';
import { churchRoutes } from './routes/church.routes';
import { musicianRoutes } from './routes/musician.routes';
import { recurringScheduleRoutes } from './routes/recurring-schedule.routes';
import { errorHandler } from './middlewares/error-handler';
import { env } from './config';

export function buildApp() {
  // 1. Criação da instância do Fastify com configurações iniciais
  const app = fastify({
    logger: {
      level: env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty'
      }
    },
    disableRequestLogging: env.NODE_ENV === 'test'
  }).withTypeProvider<ZodTypeProvider>();

  // 2. Configuração do sistema de tipos com Zod
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // 3. Middlewares globais
  app.setErrorHandler(errorHandler);

  // 4. Configuração da Documentação Swagger/OpenAPI
  if (env.NODE_ENV !== 'production') {
    app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Escala de Músicos - API',
          description: 'API para gerenciamento de escalas de músicos em igrejas',
          version: '1.0.0'
        },
        servers: [{ url: `http://localhost:${env.PORT}` }]
      }
    });

    app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false
      }
    });
  }

  // 5. Registro das rotas
  app.register(churchRoutes, { prefix: '/api/churches' });
  app.register(scheduleRoutes, { prefix: '/api/schedules' });
  app.register(musicianRoutes, { prefix: '/api/musicians' });
  app.register(recurringScheduleRoutes, { prefix: '/api/recurring-schedules' });

  // 6. Health Check
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  return app;
}