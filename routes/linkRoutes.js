const express = require('express');
const Link = require('../models/Link');

const router = express.Router();

// Crear un nuevo enlace
router.post('/', async (req, res) => {
  try {
    const { title, url, tags } = req.body;
    const newLink = new Link({ title, url, tags });
    const savedLink = await newLink.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(500).json({ error: 'Error creando el enlace' });
  }
});

// Obtener todos los enlaces
router.get('/', async (req, res) => {
  try {
    const { tags } = req.query;
    const query = tags ? { tags: { $in: tags.split(',') } } : {};
    const links = await Link.find(query);
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo los enlaces' });
  }
});

// Obtener detalles de un enlace
router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ error: 'Enlace no encontrado' });
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el enlace' });
  }
});

// Agregar un comentario a un enlace
router.post('/:id/comments', async (req, res) => {
  try {
    const { text } = req.body;
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ error: 'Enlace no encontrado' });
    link.comments.push({ text });
    await link.save();
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Error agregando el comentario' });
  }
});

// Votar por un enlace
router.post('/:id/vote', async (req, res) => {
  try {
    const { vote } = req.body; // vote puede ser +1 o -1
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ error: 'Enlace no encontrado' });
    link.votes += vote;
    await link.save();
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Error al votar' });
  }
});

module.exports = router;
