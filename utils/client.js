import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '7dyckwr8',
  dataset: "production",
  apiVersion: '2023-04-06',
  useCdn: false,
})
