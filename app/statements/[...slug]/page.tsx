import PageTitle from '@/components/PageTitle'
import { allStatements } from 'contentlayer/generated'
import StatementLayout from '@/layouts/StatementLayout';
import StatementView from '@/components/StatementView';

export const generateStaticParams = async () => {
  const paths = allStatements.map((statement) => (
    { slug: [statement.slug] }
  ))
  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  // Filter out drafts in production
  const index = allStatements.findIndex((s) => s.slug === params.slug[0])
  if (index === -1) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
      </div>
    )
  }

  const statement = allStatements[index]
  return (
    <>
      <StatementLayout statement={statement}>
        <StatementView statement={statement} />
      </StatementLayout>
    </>
  )
}