const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const phonesFile = path.join(__dirname, '../data/phones.json');
const modelsFile = path.join(__dirname, '../data/models.json');

// Utility function to read JSON files
const readJSON = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Utility function to write JSON files
const writeJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Get all phone brands
router.get('/phones', (req, res) => {
    const phones = readJSON(phonesFile);
    res.status(200).json(phones);
});

// Add a new phone brand
router.post('/phones', (req, res) => {
    const phones = readJSON(phonesFile);
    const newPhone = req.body;
    
    if (!newPhone.brand || !newPhone.name) {
        return res.status(400).json({ message: 'Brand and name are required' });
    }
    
    phones.push(newPhone);
    writeJSON(phonesFile, phones);
    res.status(201).json(newPhone);
});

// Update all phones (bulk update)
router.put('/phones', (req, res) => {
    writeJSON(phonesFile, req.body);
    res.status(200).json(req.body);
});

// Delete all phones
router.delete('/phones', (req, res) => {
    writeJSON(phonesFile, []);
    res.status(200).json({ message: 'All phone brands deleted' });
});

// Get a specific phone by ID
router.get('/phones/:phoneId', (req, res) => {
    const phones = readJSON(phonesFile);
    const phone = phones[req.params.phoneId - 1];
    if (!phone) return res.status(404).json({ message: 'Phone not found' });
    res.status(200).json(phone);
});

// Update a specific phone by ID
router.put('/phones/:phoneId', (req, res) => {
    const phones = readJSON(phonesFile);
    const phoneId = req.params.phoneId - 1;
    if (!phones[phoneId]) return res.status(404).json({ message: 'Phone not found' });
    
    phones[phoneId] = { ...phones[phoneId], ...req.body };
    writeJSON(phonesFile, phones);
    res.status(200).json(phones[phoneId]);
});

// Delete a specific phone by ID
router.delete('/phones/:phoneId', (req, res) => {
    const phones = readJSON(phonesFile);
    const phoneId = req.params.phoneId - 1;
    if (!phones[phoneId]) return res.status(404).json({ message: 'Phone not found' });
    
    phones.splice(phoneId, 1);
    writeJSON(phonesFile, phones);
    res.status(200).json({ message: 'Phone deleted' });
});

// Get all models for a specific phone brand
router.get('/phones/:phoneId/models', (req, res) => {
    const models = readJSON(modelsFile);
    const filteredModels = models.filter(model => model.id == req.params.phoneId);
    res.status(200).json(filteredModels);
});

// Add a model to a phone brand
router.post('/phones/:phoneId/models', (req, res) => {
    const models = readJSON(modelsFile);
    const newModel = { id: parseInt(req.params.phoneId), ...req.body };
    
    models.push(newModel);
    writeJSON(modelsFile, models);
    res.status(201).json(newModel);
});

// Update all models for a specific phone brand
router.put('/phones/:phoneId/models', (req, res) => {
    const models = readJSON(modelsFile);
    const updatedModels = models.map(model => model.id == req.params.phoneId ? { ...model, ...req.body } : model);
    
    writeJSON(modelsFile, updatedModels);
    res.status(200).json(updatedModels);
});

// Delete all models for a specific phone brand
router.delete('/phones/:phoneId/models', (req, res) => {
    let models = readJSON(modelsFile);
    models = models.filter(model => model.id != req.params.phoneId);
    
    writeJSON(modelsFile, models);
    res.status(200).json({ message: 'All models deleted for this brand' });
});

// Get a specific model by ID
router.get('/phones/:phoneId/models/:modelId', (req, res) => {
    const models = readJSON(modelsFile);
    const model = models.find(m => m.id == req.params.phoneId && m.id == req.params.modelId);
    if (!model) return res.status(404).json({ message: 'Model not found' });
    res.status(200).json(model);
});

// Update a specific model by ID
router.put('/phones/:phoneId/models/:modelId', (req, res) => {
    const models = readJSON(modelsFile);
    const modelIndex = models.findIndex(m => m.id == req.params.phoneId && m.id == req.params.modelId);
    if (modelIndex === -1) return res.status(404).json({ message: 'Model not found' });
    
    models[modelIndex] = { ...models[modelIndex], ...req.body };
    writeJSON(modelsFile, models);
    res.status(200).json(models[modelIndex]);
});

// Delete a specific model by ID
router.delete('/phones/:phoneId/models/:modelId', (req, res) => {
    let models = readJSON(modelsFile);
    models = models.filter(m => !(m.id == req.params.phoneId && m.id == req.params.modelId));
    
    writeJSON(modelsFile, models);
    res.status(200).json({ message: 'Model deleted' });
});

module.exports = router;
