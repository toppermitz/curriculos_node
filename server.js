import express from 'express';
import { pinoHttp } from 'pino-http';
import { ZodError } from 'zod';
import { MongoServerError } from 'mongodb';
import { logger } from './api/logger.js';
import { connect as dbConnect, close as dbClose } from './api/db.js';
import { router } from './api/routes/curriculosRoute.js';

const parsedPort = Number.parseInt(process.env.PORT ?? '', 10);
const port = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65_535 ? parsedPort : 3000;

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
  logger.fatal({ err }, 'falha ao conectar no mongodb');
  process.exit(1);
}

const server = app.listen(port, () => {
  logger.info({ port }, 'servidor iniciado');
});

const shutdown = (signal) => {
  logger.info({ signal }, 'recebido sinal de shutdown');
  const forceTimer = setTimeout(() => {
    logger.error('shutdown forçado após timeout');
    process.exit(1);
  }, 10_000).unref();
  server.close(async () => {
    let exitCode = 0;
    try {
      await dbClose();
    } catch (err) {
      logger.error({ err }, 'erro ao fechar conexão mongodb');
      exitCode = 1;
    } finally {
      clearTimeout(forceTimer);
      process.exit(exitCode);
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
