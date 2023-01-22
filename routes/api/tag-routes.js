const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({includes: [Product]})
  // be sure to include its associated Product data
  .then(allTagData=>{
    res.json(allTagData)
  })
  .catch(err=> {
    console.log(err)
  })
});

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
//   Tag.findOne({where: {id: req.params.id}, include: [Product]})
//   .then(tag=> {
//     res.json(tag)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// });
router.get('/:id', async (req, res) => {
  try {
    const soloTagData = await Tag.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: Product, through: ProductTag, as: 'tag_name' }]
    });

    if (!soloTagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(soloTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(novaTagData=> {
    res.json(novaTagData)
  })
  .catch(err => {
    console.log(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {where: {id: req.params.id}})
  .then(upTagData=>{
    res.sendStatus(200)
  })
});

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
//   Tag.destroy({where: {id: req.params.id}})
//   .then(tagData=> {
//     res.sendStatus(200)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// });
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
