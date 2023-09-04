"use client"
import {useState} from 'react'
import {Statement} from 'contentlayer/generated';
import {format, parseISO} from 'date-fns';

interface Props {
  statement: Statement
}

type Argument = {
  id: number,
  parent: number,
  date: string|undefined,
  title: string,
  desc: string|undefined,
  type: string,
  pro: Argument[],
  con: Argument[]
}

interface AncestorsParams {
  argumentMap: { [key: string]: Argument }
  argument: Argument,
  onClick: (data: Argument) => void
}

interface ArgumentParams {
  argument: Argument,
  onClick: (data: Argument) => void
  depth: number
}

const borderColor = (argument: Argument) => {
  switch (argument.type) {
    case 'pro': return 'border border-gray-50 dark:border-gray-900 hover:border-green-500 dark:hover:border-green-500'
    case 'con': return 'border border-gray-50 dark:border-gray-900 hover:border-red-500 dark:hover:border-red-500'
    default: return 'border border-gray-50 dark:border-gray-900 hover:border-blue-500 dark:hover:border-blue-500'
  }
}

// 显示祖先信息
const AncestorsView = ({ argumentMap, argument, onClick }: AncestorsParams) => {
  if (argument.parent < 0) {
    return (<></>)
  }
  const parentToRoot = []
  let current = argument
  do {
    current = argumentMap[current.parent]
    parentToRoot.unshift(current)
  } while (current.parent >= 0)
  const len = parentToRoot.length - 1
  return (
    <div className='mb-2 mx-64'>
      <ul>
        {parentToRoot.map((parent, i) => (
          <li key={i}>
            <div className='pb-2 mx-auto' style={{width: `${100 * 0.97 ** (len - i)}%`}}>
              <div
                className={`p-4 rounded cursor-pointer bg-gray-50 dark:bg-neutral-800 ${borderColor(parent)}`}
                onClick={() => onClick(parent)}
              >
                {parent.title}
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}

const MainArgumentView = ({ argument }: { argument: Argument }) => {
  return (
    <div className='bg-gray-50 dark:bg-neutral-800'>
      { argument.date !== undefined && (
        <div className='float-right relative right-1.5 top-0.5 text-sm'>
          <time dateTime={argument.date} className='text-gray-400'>
            {format(parseISO(argument.date!), 'yyyy-MM-dd')}
          </time>
        </div>
        )
      }

      <div className={`p-4 rounded ${borderColor(argument)}`}>
        {argument.title}
      </div>
      <div className="flex">
        <div className="w-1/2 p-2 text-center text-sm text-green-500">
          同意
        </div>
        <div className="w-1/2 p-2 text-center text-sm text-red-500">
          反对
        </div>
      </div>
    </div>
  )
}

const SubArgumentView = ({ argument, onClick }: ArgumentParams) => {
  const renderFooter = (argument: Argument) => {
    if (argument.pro.length <= 0 && argument.con.length <= 0) {
      return <div className='flex bg-gray-50 dark:bg-neutral-800'></div>
    }
    if (argument.pro.length <= 0) {
      return (
        <div className='flex bg-gray-50 dark:bg-neutral-800'>
          <div className="w-1/2 p-1 text-center text-green-500 text-sm">同意</div>
          <div className="w-1/2 p-1 text-center text-red-500 text-sm bg-red-500 dark:bg-red-800">
            反对 {argument.con.length}
          </div>
        </div>
      )
    }
    if (argument.con.length <= 0) {
      return (
        <div className='flex bg-gray-50 dark:bg-neutral-800'>
          <div className="w-1/2 p-1 text-center text-green-500 text-sm bg-green-500 dark:bg-green-800">
            同意 {argument.pro.length}
          </div>
          <div className="w-1/2 p-1 text-center text-red-500 text-sm">反对</div>
        </div>
      )
    }
    return (
      <div className='flex bg-gray-50 dark:bg-neutral-800'>
        <div className="w-1/2 p-1 text-center text-green-500 text-sm bg-green-500 dark:bg-green-800">
          同意 {argument.pro.length}
        </div>
        <div className="w-1/2 p-1 text-center text-red-500 text-sm bg-red-500 dark:bg-red-800">
          反对 {argument.con.length}
        </div>
      </div>
    )
  }
  return (
    <div className="mb-4">
      <div className='float-right relative right-1.5 top-0.5 text-sm'>
        <span className='inline-flex items-center justify-center min-w-[1rem] h-4 text-xs font-semibold rounded-full text-gray-500 bg-gray-200 dark:bg-gray-800'>
          {argument.id}
        </span>
      </div>
      <div
        className={`p-4 pr-6 rounded cursor-pointer bg-gray-50 dark:bg-neutral-800 ${borderColor(argument)}`}
        onClick={() => onClick(argument)}
      >
        {argument.title}
      </div>
      <div className='rounded h-0.5 overflow-hidden'>
        {renderFooter(argument)}
      </div>
    </div>
  )
}

// Argument component
const ArgumentView = ({ argument, onClick, depth }: ArgumentParams) => {

  return (
    <div className="mb-4 min-w-full">
      <MainArgumentView argument={argument} />
      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          {argument.pro.map((arg, idx) => (
            <SubArgumentView key={idx} argument={arg} onClick={onClick} depth={depth + 1} />
          ))}
        </div>
        <div className="w-1/2 pl-2">
          {argument.con.map((arg, idx) => (
            <SubArgumentView key={idx} argument={arg} onClick={onClick} depth={depth + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

const generateArgumentTree = (statement: Statement) => {
  const argumentRoot = {
    id: statement.id,
    parent: -1,
    date: statement.date,
    title: statement.title,
    desc: statement.statement,
    type: '',
    pro: [], con: []
  }
  const argumentsMap: { [id: number]: Argument } = {}
  argumentsMap[statement.id] = argumentRoot
  for (let idx in statement.arguments) {
    const item = statement.arguments[idx]
    const argument = {
      id: item.id,
      parent: item.parent,
      date: undefined,
      title: item.title,
      desc: item.statement,
      type: item.type,
      pro: [], con: []
    }
    argumentsMap[argument.id] = argument
    const parent = argumentsMap[item.parent]
    if (item.type === 'pro') parent.pro.push(argument)
    else parent.con.push(argument)
  }
  return { argumentsMap, argumentRoot }
}

export default function StatementView({ statement }: Props) {
  const { argumentsMap, argumentRoot} = generateArgumentTree(statement)
  const [currentData, setCurrentData] = useState<Argument>(argumentRoot);

  const handleArgumentClick = (data: Argument) => {
    setCurrentData(data);
  };

  return (
    <div className='flex flex-col items-center'>
      <AncestorsView argumentMap={argumentsMap} argument={currentData} onClick={handleArgumentClick} />
      <ArgumentView argument={currentData} onClick={handleArgumentClick} depth={0} />
    </div>
  )
}