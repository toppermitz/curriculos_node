import express from 'express';
import { pinoHttp } from 'pino-http';
import { ZodError } from 'zod';
import { MongoServerError } from 'mongodb';
import { logger } from './api/logger.js';
import { connect as dbConnect, close as dbClose } from './api/db.js';
import { router } from './api/routes/curriculosRoute.js';

const port = Number(process.env.PORT ?? 3000);

const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(router);

app.use((err, req, res, _next) => {
  if (err instanceof ZodError) {
    req.log.warn({ issues: err.issues }, 'validação falhou');
    return res.status(400).json({ erro: 'validação falhou', detalhes: err.issues });
  }
  if (err instanceof MongoServerError && err.code === 11000) {
    req.log.warn({ err }, 'duplicate key');
    return res.status(409).json({ erro: 'registro duplicado' });
  }
  req.log.error({ err }, 'erro não tratado');
  res.status(500).json({ erro: 'erro interno' });
});

try {
  await dbConnect();
} catch (err) {
  logger.fatal({ err: err.message }, 'falha ao conectar no mongodb');
  process.exit(1);
}

const server = app.listen(port, () => {
  logger.info({ port }, 'servidor iniciado');
});

const shutdown = async (signal) => {
  logger.info({ signal }, 'recebido sinal de shutdown');
  server.close(async () => {
    await dbClose();
    process.exit(0);
  });
  setTimeout(() => {
    logger.error('shutdown forçado após timeout');
    process.exit(1);
  }, 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
