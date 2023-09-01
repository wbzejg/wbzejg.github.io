import {format, parseISO} from 'date-fns';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import {Statement} from 'contentlayer/generated';

interface StatementListItemProps {
  statement: Statement
}

export default function StatementListItem({statement}: StatementListItemProps) {
  return (
    <article className="space-y-2 flex flex-col xl:space-y-0">
      <div className="space-y-3">
        <div>
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={statement.date}>{format(parseISO(statement.date), 'yyyy-MM-dd')}</time>
            </dd>
          </dl>
          <h2 className="text-2xl leading-8 tracking-tight">
            <Link href={`/statements/${statement.slug}/`} className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600">
              {statement.title}
            </Link>
          </h2>
          <div className="flex flex-wrap mt-2">
            {statement.tags?.map((tag) => <Tag key={tag} text={tag} />)}
          </div>
        </div>
      </div>
    </article>
  )
}