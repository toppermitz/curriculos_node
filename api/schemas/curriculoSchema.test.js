import { test } from 'node:test';
import assert from 'node:assert/strict';
import { curriculoSchema } from './curriculoSchema.js';

const validPayload = () => ({
  nome: 'Fulano de Tal',
  email: 'fulano@example.com',
  telefone: '(11)98765-4321',
  linkedin: 'https://linkedin.com/in/fulano',
  pdfcurriculo: Buffer.from('pdf-bytes').toString('base64'),
  vaga: 'nodejs',
  ambiente: 'producao',
  zip: Buffer.from('zip-bytes').toString('base64'),
});

test('aceita payload válido', () => {
  const result = curriculoSchema.safeParse(validPayload());
  assert.equal(result.success, true);
});

test('aplica defaults de vaga e ambiente', () => {
  const { vaga, ambiente, ...rest } = validPayload();
  const result = curriculoSchema.parse(rest);
  assert.equal(result.vaga, 'delphi');
  assert.equal(result.ambiente, 'teste');
});

test('rejeita email inválido', () => {
  const result = curriculoSchema.safeParse({ ...validPayload(), email: 'nao-eh-email' });
  assert.equal(result.success, false);
});

test('rejeita telefone fora do formato BR', () => {
  const result = curriculoSchema.safeParse({ ...validPayload(), telefone: '11987654321' });
  assert.equal(result.success, false);
});

test('rejeita vaga fora do enum', () => {
  const result = curriculoSchema.safeParse({ ...validPayload(), vaga: 'python' });
  assert.equal(result.success, false);
});

test('rejeita base64 malformado em pdfcurriculo', () => {
  const result = curriculoSchema.safeParse({ ...validPayload(), pdfcurriculo: '!!!nao base64!!!' });
  assert.equal(result.success, false);
});

test('rejeita base64 malformado em zip', () => {
  const result = curriculoSchema.safeParse({ ...validPayload(), zip: '!!!nao base64!!!' });
  assert.equal(result.success, false);
});

test('rejeita nome vazio', () => {
  const result = curriculoSchema.safeParse({ ...validPayload(), nome: '' });
  assert.equal(result.success, false);
});
