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
    {
      name: 'subMenuImage',
      title: 'Sub-Menu Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
      description: 'Image used for the sub-menu display',
    },
    {
      name: 'ordinal',
      title: 'Ordinal',
      type: 'number',
      description: 'Set the display order of the category list in the subMenu',
    },
  ],
}
export default category
