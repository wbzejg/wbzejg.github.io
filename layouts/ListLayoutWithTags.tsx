import type { Statement } from 'contentlayer/generated'
import TagLists from '@/components/TagLists';
import Pagination, {PaginationProps} from '@/components/Pagination';
import StatementListItem from '@/components/StatementListItem';
interface ListLayoutProps {
  statements: Statement[]
  initialDisplayStatements?: Statement[]
  pagination?: PaginationProps
}

export default function ListLayoutWithTags({
                                             statements,
                                             initialDisplayStatements = [],
                                             pagination,
                                           }: ListLayoutProps) {
  const displayStatements = initialDisplayStatements.length > 0 ? initialDisplayStatements : statements
  return (
    <div>
      <div className="flex sm:space-x-24">
        <TagLists statements={statements} initialDisplayStatements={initialDisplayStatements} />
        {/* TODO 这里应该是通过 space 自动算 ml, class 里写 ml 也不管用 */}
        <div style={{ marginLeft: '96px' }}>
          <ul>
            {displayStatements.map((statement, idx) => {
              return (
                <li key={idx} className="py-5">
                  <StatementListItem statement={statement} />
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}