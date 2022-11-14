const router = require('express').Router();
const { regexp } = require('sequelize/types/lib/operators');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//MELANGER
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(Product)
  .then(categories => {
    res.json(categories)
  })
  .catch(err => {
    console.log(err)
  })
});

// potentially async MELANGER
router.get('category/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({where: {id: req.params.id}, include: [Product]})
  .then(category=> {
    res.json(category)
  })
  .catch(err => {
    console.log(err)
  })
});
// router.get('/:id', async (req, res) => {
//   try {
//     const libraryCardData = await LibraryCard.findByPk(req.params.id, {
//       include: [{ model: Reader }],
//     });

//     if (!libraryCardData) {
//       res.status(404).json({ message: 'No library card found with that id!' });
//       return;
//     }

//     res.status(200).json(libraryCardData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//added categories before req, res. MELANGER
router.post('/categories', (req, res) => {
  // create new category
  Category.create(req.body)
  .then(category=> {
    res.json(category)
  })
  .catch(err => {
    console.log(err)
  })
});
//M E L A N G E
router.put('/categories/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {where: id: req.params.id})
  .then(category => {
    res.sendStatus(200).json(Category);
  }}
   .catch(err => {
    console.log(err)
   })
});
//M E L A N G E
router.delete('/categories/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}})
  .then(category=> {
    res.sendStatus(200)
  })
});

module.exports = router;
