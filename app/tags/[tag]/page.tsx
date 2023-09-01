import { slug } from 'github-slugger'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import {allStatements} from 'contentlayer/generated'
import tagData from 'app/tag-data.json'

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }))
  return paths
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  // Capitalize first letter and convert space to dash
  const filteredStatements = allStatements.filter((statement) =>
    statement.tags && statement.tags.map((t) => slug(t)).includes(tag))
  return <ListLayoutWithTags statements={filteredStatements} />
}