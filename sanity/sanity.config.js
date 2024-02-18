import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'sanity-vine-frond',

  projectId: '7dyckwr8',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Vine & Frond')
          .items([
            S.listItem()
              .title('Shop Items')
              .child(
                S.list()
                  .title('Shop Items')
                  .items([
                    S.documentTypeListItem('product').title('Shop Items'),
                    S.documentTypeListItem('wholeSaleProduct').title('Whole Sale Products'),
                  ])
              ),
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Store Config')
                      .child(
                        S.list()
                          .title('Store Config')
                          .items([
                            S.documentTypeListItem('category').title(' Product Categories'),
                            S.documentTypeListItem('subCategory').title('Product Sub-Categories'),
                          ])
                      ),
                    S.listItem()
                      .title('General Config')
                      .child(
                        S.list()
                          .title('General Config')
                          .items([
                            S.documentTypeListItem('topBanner').title('Top Banner'),
                            S.documentTypeListItem('stockist').title('Stockists'),
                            S.documentTypeListItem('bio').title('Bio'),
                          ])
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
