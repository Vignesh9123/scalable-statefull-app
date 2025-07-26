

import MainContent from '@/components/MainContent';

async function Home({params}:{params:{chatId:string}}) {
      const chatId = (await params).chatId

    return (
        <>
          <MainContent chatId={chatId}/>
            
        </>
  )
}

export default Home
