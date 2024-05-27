'use server'
import CategData from "@/app/components/CategData";
import Timer from "@/app/components/Timer";
import { db } from "@/utils/db"
import { getPrevious, getProj } from "@/utils/handleDB";
import Link from "next/link";

type PageByIdProps = {
  params: {
      id: number,
  }
}

export default async function home({params}: PageByIdProps) {
  const id: number = params.id;
  const data = await getProj(id);
  const previousTimeSpent = await getPrevious(id);

  const categs = await db.query('SELECT * FROM categories');

  return (
    <div className="h-screen w-full flex items-center flex-col bg-[--darkestBlue] gap-10 text-white">
      <div className="w-full py-3 border-b-4 border-[--offWhite] rounded-b-lg flex flex-col items-center justify-center gap-1 bg-[--darkerBlue]">
        <h2 className="text-xl text-[--offWhite] gloria-hallelujah-regular"> project name:</h2>
        <div className="bg-[--offWhite] w-20 h-0.5"></div>
        <h1 id="white_webkit" className="text-3xl tracking-wider text-[--darkestBlue] inconsolata-500"> <b>{data[0].name} </b> </h1>
      </div>

      <Link href={'/home'} className="underline inconsolata-500 text-lg text-[--offWhite]" >{'<'}- return home</Link>
      
      <div className="w-full h-[30em] border-t-2 border-[--offWhite] bg-[--lightBlue] flex flex-col items-center justify-center gap-2">
        <Timer params={data[0]} previousTimeSpent={previousTimeSpent} data={categs.rows} />
        <CategData params={{ id: params.id }} />
      </div>
    </div>
  )
}
