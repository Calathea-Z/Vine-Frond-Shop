import { createClient } from 'next-sanity';

const client = createClient({
  projectId: "7dyckwr8",
  dataset: "production",
  useCdn: false,
})

export { client }