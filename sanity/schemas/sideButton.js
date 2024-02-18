const sideButton = {
  name: 'sideButton',
  title: 'Side Button',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'The text to display on the side button',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'The URL the button will direct to.',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'The background color for the side banner',
    },
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Toggle to show or hide the side banner',
    },
  ],
}

export default sideButton
