import {ReactNode} from 'react'
import {Statement} from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'

interface LayoutProps {
  statement: Statement
  children: ReactNode
}

export default function StatementLayout({ statement, children }: LayoutProps) {
  return (
    <SectionContainer>
      <article className='mt-20'>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
            </div>
          </div>
          <footer>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}