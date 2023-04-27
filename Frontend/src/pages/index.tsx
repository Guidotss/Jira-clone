import { TodoGrid, TodoLayOut, TodoModal } from '@/components'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <TodoLayOut title='Home Jira' description='Pagina principal de Jira-clone'>
      <div>
        <div>
          <TodoGrid/>
        </div>
        <div>
          <TodoModal/>
        </div>
      </div>

    </TodoLayOut>
  )
}
