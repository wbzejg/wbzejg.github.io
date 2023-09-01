import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  count?: number|undefined
}

const Tag = ({ text, count }: Props) => {
  return (
    <div className='bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500'>
      <Link
        href={`/tags/${slug(text)}`}
        className="text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      >
        {text.split(' ').join('-')}
        { count && <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
          {count}
        </span> }
      </Link>
    </div>
  )
}

export default Tag