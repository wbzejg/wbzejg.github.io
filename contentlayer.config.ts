import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allStatements: any) {
  const tagCount: Record<string, number> = {}
  allStatements.forEach((statement: any) => {
    if (statement.tags) {
      statement.tags.forEach((tag: string) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

const Arguments = defineNestedType(() => ({
  name: 'Arguments',
  fields: {
    id: { type: 'number', required: true },
    parent: { type: 'number', required: true },
    title: { type: 'string', required: true },
    statement: { type: 'string' },
    type: { type: 'enum', options: ['pro', 'con'], required: true },
    references: { type: 'list', of: { type: 'string' } },
  },
}))

export const Statement = defineDocumentType(() => ({
  name: 'Statement',
  filePathPattern: `**/*.yaml`,
  fields: {
    id: { type: 'number', required: true },
    date: { type: 'date', required: true },
    title: { type: 'string', required: true },
    statement: { type: 'string' },
    references: { type: 'list', of: { type: 'string' } },
    source: { type: 'string' },
    tags: { type: 'list', of: { type: 'string'} },
    arguments: { type: 'list', of: Arguments, required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (stat) => stat._raw.sourceFileDir },
  },
}))

export default makeSource({
  fieldOptions: {
    typeFieldName: '_type',
  },
  contentDirPath: 'statements',
  documentTypes: [Statement],
  onSuccess: async (importData) => {
    const { allStatements } = await importData()
    createTagCount(allStatements)
  }
})
