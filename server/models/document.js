const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  id: { type: String, required: false }, // change this
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

module.exports = mongoose.model('Document', documentSchema);