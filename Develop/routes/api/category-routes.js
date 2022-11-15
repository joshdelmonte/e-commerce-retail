const router = require('express').Router();
const { Product, Category } = require('../../models');

// The `/api/categories` endpoint
//MELANGER
// router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
//   Category.findAll(Product)
//   .then(categories => {
//     res.json(categories)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// });
// OR
router.get('/', async (req, res) => {
  try {
    const Product = await Category.findAll();
    res.status(200).json(Product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// potentially async MELANGER
// router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
//   Category.findOne({where: {id: req.params.id}, include: [Product]})
//   .then(category=> {
//     res.json(category)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// });
//OR this might be better
// GET a single traveller
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: Product, through: Product, as: 'category_id' }]
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', (req, res) => {
  // create new category
//   Category.create(req.body)
//   .then((category)=> {
//     res.json(category)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// });
//Or this might be better
// 

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});
//M E L A N G E
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { 
      id: req.params.id
    }
  })
   .then(category => {
    res.sendStatus(200).json(Category);
  })
   .catch(err => {
    console.log(err)
   })
});
// OR this may be better
// update category
router.put('/:id', (req, res) => {
  // update ca data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated tags from ProductTag
      res.status(200).json(category)
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
   .catch(err =>{
    res.status(400).json(err)
   })
        });
      
//M E L A N G E
// router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
//   Category.destroy({where: {id: req.params.id}})
//   .then(category=> {
//     res.sendStatus(200)
//   })
// });
// or this might be better
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!category) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
