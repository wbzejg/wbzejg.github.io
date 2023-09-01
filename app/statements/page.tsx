import { allStatements } from 'contentlayer/generated'
import ListLayout from '@/layouts/ListLayoutWithTags';

export default async function Page() {
  return <ListLayout statements={allStatements} />
}