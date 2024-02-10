export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'photo',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        },
      ],
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
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'subCategory',
      title: 'Sub Category',
      type: 'string',
    },
    {
      name: 'measurements',
      title: 'Measurements',
      type: 'string',
    },
    {
      name: 'shippingWeight',
      title: 'Weight (ounces)',
      type: 'number',
    },
    {
      name: 'countInStock',
      title: 'Count In Stock',
      type: 'number',
    },
  ],
}
