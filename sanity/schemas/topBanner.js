const topBanner = {
  name: 'topBanner',
  title: 'Top Banner',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'The text to display on the top banner',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'The URL the banner will link to',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'The background color for the top banner',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
      description: 'The text color for the top banner',
    },
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Toggle to show or hide the top banner',
    },
  ],
}

export default topBanner
