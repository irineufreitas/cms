const Sequence = require('../models/sequence');

class SequenceGenerator {
  constructor() {
    this.sequenceId = null;
    this.maxDocumentId = 0;
    this.maxMessageId = 0;
    this.maxContactId = 0;

    this.init();
  }

  async init() {
    try {
      const sequence = await Sequence.findOne().exec();

      if (!sequence) {
        throw new Error('No sequence document found.');
      }

      this.sequenceId = sequence._id;
      this.maxDocumentId = sequence.maxDocumentId;
      this.maxMessageId = sequence.maxMessageId;
      this.maxContactId = sequence.maxContactId;
    } catch (err) {
      console.error('❌ Error initializing sequence generator:', err);
    }
  }

  async nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'documents':
        this.maxDocumentId++;
        updateObject = { maxDocumentId: this.maxDocumentId };
        nextId = this.maxDocumentId;
        break;
      case 'messages':
        this.maxMessageId++;
        updateObject = { maxMessageId: this.maxMessageId };
        nextId = this.maxMessageId;
        break;
      case 'contacts':
        this.maxContactId++;
        updateObject = { maxContactId: this.maxContactId };
        nextId = this.maxContactId;
        break;
      default:
        return -1;
    }

    try {
      await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject });
      return nextId;
    } catch (err) {
      console.error('❌ nextId update error:', err);
      return null;
    }
  }
}

module.exports = new SequenceGenerator();