const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

// GET documents
router.get('/', (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json({
        message: 'Documents fetched successfully!',
        documents: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// POST document
router.post('/', async (req, res, next) => {
  try {
    console.log('📦 Received document body:', req.body);

    const maxDocId = await sequenceGenerator.nextId("documents"); // ✅ AWAIT HERE

    const document = new Document({
      id: maxDocId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      children: []
    });

    const createdDoc = await document.save();

    res.status(201).json({
      message: 'Document added successfully',
      document: createdDoc
    });
  } catch (error) {
    console.error('❌ Document save failed:', error);
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

// PUT update document
router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found' }
        });
      }

      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;
      document.children = req.body.children || [];

      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// DELETE document
router.delete('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found' }
        });
      }

      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'Document deleted successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});



module.exports = router;
