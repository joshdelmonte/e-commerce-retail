// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// You'll need to execute association methods on your Sequelize models to create
//  the following relationships between them
// * `Product` belongs to `Category`, and `Category` has many `Product` models, as a category
//  can have multiple products but a product can only belong to one category.

Product.belongsTo(Category, {
  foreignKey: `category_id`,
  onDelete:'CASCADE'
})

Category.hasMany(Product, {
  foreignKey: `category_id`
})
// * `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models.
//  Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
  // through: ProductTag
})

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
  // through: ProductTag
})
// > **Hint:** Make sure you set up foreign key relationships that match the column we created in the respective models.


// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
