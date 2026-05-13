import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { enviarCurriculo } from '../controllers/curriculosController.js';

const enviarLimiter = rateLimit({
  windowMs: 60_000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { mensagem: 'Muitas requisições. Tente novamente em alguns instantes.' },
});

export const router = Router();

router.post('/curriculo/enviar', enviarLimiter, enviarCurriculo);
