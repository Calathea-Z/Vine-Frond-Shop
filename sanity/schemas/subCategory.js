const subCategory = {
  name: 'subCategory',
  title: 'Sub Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
  ],
}

export default subCategory
