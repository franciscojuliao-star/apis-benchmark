const { Router } = require('express');
const Projeto = require('../models/Projeto');

const router = Router();

/**
 * @swagger
 * /projetos:
 *   post:
 *     summary: Criar um novo projeto
 *     tags: [Projetos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjetoInput'
 *     responses:
 *       201:
 *         description: Projeto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projeto'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  try {
    const projeto = await Projeto.create(req.body);
    res.status(201).json(projeto);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

/**
 * @swagger
 * /projetos:
 *   get:
 *     summary: Listar todos os projetos
 *     tags: [Projetos]
 *     responses:
 *       200:
 *         description: Lista de projetos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projeto'
 */
router.get('/', async (req, res) => {
  const projetos = await Projeto.findAll();
  res.json(projetos);
});

/**
 * @swagger
 * /projetos/{id}:
 *   get:
 *     summary: Buscar projeto por ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projeto'
 *       404:
 *         description: Projeto não encontrado
 */
router.get('/:id', async (req, res) => {
  const projeto = await Projeto.findByPk(req.params.id);
  if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(projeto);
});

/**
 * @swagger
 * /projetos/{id}:
 *   put:
 *     summary: Atualizar projeto por ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjetoInput'
 *     responses:
 *       200:
 *         description: Projeto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projeto'
 *       404:
 *         description: Projeto não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const projeto = await Projeto.findByPk(req.params.id);
    if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
    await projeto.update(req.body);
    res.json(projeto);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

/**
 * @swagger
 * /projetos/{id}:
 *   delete:
 *     summary: Deletar projeto por ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Projeto deletado
 *       404:
 *         description: Projeto não encontrado
 */
router.delete('/:id', async (req, res) => {
  const projeto = await Projeto.findByPk(req.params.id);
  if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
  await projeto.destroy();
  res.status(204).send();
});

module.exports = router;
