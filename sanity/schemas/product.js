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
      name: 'tagLine',
      title: 'Tag Line',
      type: 'text',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5, // This will make the text area larger, allowing for paragraph input
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
      description: 'Select the primary category for the product',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'subCategory',
      title: 'Sub Category',
      description: 'Select any applicable subcategories for the product',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'subCategory'}]}],
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
    {
      name: 'featuredProduct',
      title: 'Featured Product',
      type: 'boolean',
      description:
        'Toggle on if this is a featured product (**There must be 5 featured products total for the carousel to work!**)',
    },
  ],
}
