const category = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'hidden',
      title: 'Hidden',
      type: 'boolean',
      description: 'Enable to hide this category from the site',
    },
  ],
}
export default category
