import { curriculoSchema } from '../schemas/curriculoSchema.js';
import { getCollection } from '../db.js';

export async function enviarCurriculo(req, res, next) {
  try {
    const data = curriculoSchema.parse(req.body);
    const result = await getCollection('curriculos').insertOne({
      ...data,
      createdAt: new Date(),
    });
    res.status(201).json({
      id: result.insertedId,
      mensagem: 'Seu currículo foi cadastrado com sucesso',
    });
  } catch (err) {
    next(err);
  }
}
