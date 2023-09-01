/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import type { Statement } from 'contentlayer/generated'
import Link from '@/components/Link'
import tagData from '@/app/tag-data.json'

interface TagListProps {
  statements: Statement[]
  initialDisplayStatements?: Statement[]
}

export default function TagLists({
                                   statements,
                                   initialDisplayStatements = [],
                                 }: TagListProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayStatements = initialDisplayStatements.length > 0 ? initialDisplayStatements : statements

  return (
    <div className="hidden max-h-screen h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px] overflow-auto">
      <div className="py-4 px-6">
        {pathname.startsWith('/statements') ? (
          <h3 className="text-primary-500 font-bold uppercase">所有话题</h3>
        ) : (
          <Link
            href={`/statements`}
            className="font-bold uppercase text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
          >
            所有话题
          </Link>
        )}
        <ul>
          {sortedTags.map((t) => {
            return (
              <li key={t} className="my-3">
                {pathname.split('/tags/')[1] === encodeURIComponent(slug(t)) ? (
                  <h3 className="inline py-2 px-3 uppercase text-sm font-bold text-primary-500">
                    {`${t} (${tagCounts[t]})`}
                  </h3>
                ) : (
                  <Link
                    href={`/tags/${slug(t)}`}
                    className="py-2 px-3 uppercase text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                    aria-label={`View posts tagged ${t}`}
                  >
                    {`${t} (${tagCounts[t]})`}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}