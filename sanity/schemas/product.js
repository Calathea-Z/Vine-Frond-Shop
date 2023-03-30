export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
     name: 'price',
     title: 'Price',
     type: 'number', 
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'subCategory',
      title: 'Sub Category',
      type: 'string'
    },
    {
      name: 'measurements',
      title: 'Measurements',
      type: 'string'
    },
    {
      name: 'countInStock',
      title: "Count In Stock",
      type: 'number'

    }
  ]
}