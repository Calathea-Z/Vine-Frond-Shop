import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'Vine & Frond Sanity Studio',

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
                  .title('Categories')
                  .items([
                    S.documentTypeListItem('category')
                      .title('Categories')
                      // Directly list all categories
                      .child(
                        S.documentTypeList('category')
                          .title('Categories')
                          .child((categoryId) =>
                            // Once a category is selected, list its subcategories
                            S.documentList()
                              .title('Sub Categories')
                              .schemaType('subCategory')
                              .filter(
                                '_type == "subCategory" && parentCategory._ref == $categoryId'
                              )
                              .params({categoryId})
                              .child((subCategoryId) =>
                                // Once a subcategory is selected, list products or create a new one
                                S.documentList()
                                  .title('Products')
                                  .schemaType('product')
                                  .filter(
                                    '_type == "product" && subCategory._ref == $subCategoryId'
                                  )
                                  .params({subCategoryId})
                              )
                          )
                      ),
                  ])
              ),
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Config')
                      .child(
                        S.list()
                          .title('Site Config')
                          .items([
                            S.documentTypeListItem('topBanner').title('Top Banner'),
                            S.documentTypeListItem('sideButton').title('Side Button'),
                            S.documentTypeListItem('stockist').title('Stockists List'),
                            S.documentTypeListItem('bio').title('About Page'),
                          ])
                      ),
                    S.listItem()
                      .title('Sanity Settings')
                      .child(
                        S.list()
                          .title('Sanity Settings')
                          .items([
                            S.listItem()
                              .title('Category List')
                              .child(S.documentTypeList('category').title('All Categories')),
                            S.listItem()
                              .title('Sub-Category List')
                              .child(S.documentTypeList('subCategory').title('All Sub-Categories')),
                            S.listItem()
                              .title('All Products')
                              .child(S.documentTypeList('product').title('All Products')),
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
