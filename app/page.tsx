import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className='mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-50 sm:text-7xl'>
        一个展现不同观点的网站
      </h1>
      <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 dark:text-slate-50'>
        本网站旨在通过展示多维度的观点，拓宽我们的思维视野，帮助我们从不同角度审视问题，以摆脱像二极管那样局限于单一和偏激的看法。
      </p>
      <div className='mt-10 flex justify-center gap-x-6'>
        <Link href='/statements' className='group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 dark:bg-slate-50 text-white dark:text-black hover:bg-slate-700 dark:hover:bg-slate-400 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900'>
          查看话题
        </Link>
        <a href='https://github.com/wbzejg/wbzejg.github.io' className='group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 dark:bg-slate-50 text-white dark:text-black hover:bg-slate-700 hover:text-slate-100 dark:hover:bg-slate-400 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900'>参与讨论</a>
      </div>
    </main>
  )
}
