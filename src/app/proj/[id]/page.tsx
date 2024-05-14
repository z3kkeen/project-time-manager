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
    <div className="h-screen w-full flex justify-center items-center flex-col bg-slate-600 gap-10 text-white">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl"> project name:</h2>
        <h1 className="text-3xl tracking-wider"> <b>{data[0].name} </b> </h1>
      </div>

      <Link href={'/home'} className="underline" >HOME</Link>
      
      <div className="flex flex-col items-center justify-center gap-4">
        <Timer params={data[0]} previousTimeSpent={previousTimeSpent} data={categs.rows} />
      </div>

      <div className="bg-white text-black px-4">
        <CategData params={{ id: params.id }} />
      </div>

    </div>
  )
}
