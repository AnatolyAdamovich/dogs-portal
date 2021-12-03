const express = require('express');
const router = express.Router();
const upload = require('../controllers/imageController.js')
const { Breeds } = require('../models')


// Получение всех пород
router.get('/', async (req, res)=>{
    const listOfBreeds = await Breeds.findAll();
    res.json(listOfBreeds)
})

// Конкретная порода
router.get('/breed/:id', async (req, res)=>{
    const id = req.params.id;
    const id_Breed = await Breeds.findByPk(id);
    res.json(id_Breed);
})

// Только контент-менеджер и админ
// могут наполнять главную страницу
router.post('/create', upload.single('breed'), async (req, res)=>{
    const data_from_frontend = req.body;
    const data_to_DB = {
        breed_name: data_from_frontend.breed_name,
        info: data_from_frontend.info,
        image_path: req.file.path
    }
    await Breeds.create(data_to_DB);
    res.send('Успешно добавлена новая порода!');
})

module.exports = router