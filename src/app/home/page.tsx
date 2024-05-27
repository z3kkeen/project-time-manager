import { deleteData, getAll, getData } from '@/utils/handleDB';
import { revalidateTag } from 'next/cache';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Link from 'next/link';
import React from 'react'
import ExtendedHome from '../components/ExtendedHome';

export default async function home() {
  const session = await getServerSession(authOptions) as Session;
  const data = await getAll(session);
  const projData = await getData();
  revalidateTag('project');
    
  const deleteProj = async (formData:FormData) => {
    'use server'
    const id = Number(formData.get('id'));
    const data = await deleteData(Number(id));
    revalidateTag('project');
  }
    
    return (
      <div className="h-screen min-w-full flex  items-center flex-col bg-[--darkestBlue] gap-10">

        <header className="w-full h-28 flex justify-center items-center flex-col bg-[--lightBlue] border-b-4 border-[--offWhite] rounded-b-xl">
          <h1 className="text-xl text-[--offWhite] gloria-hallelujah-regular tracker-widest">Time Manager</h1>

          <div className="bg-[--offWhite] h-0.5 w-28"></div>

          <h1 id="dBlue_webkit" className="inconsolata-500 text-3xl text-[--offWhite]"><b>HOME</b></h1>

        </header>
      
        <h1 className="text-[#8BA0B9] gloria-hallelujah-regular tracking-widest text-2xl"> <i>- Welcome! -</i></h1>

      <main className="w-full min-h-96 flex justify-start items-start flex-wrap gap-3 bg-[--darkerBlue] p-3 text-white rounded-lg">
        {data.map((project) => {

          let timeLeft = project.totaltimespent;
          let hours = Math.floor(timeLeft / 3600);
          timeLeft -= hours * 3600;

          let minutes = Math.floor(timeLeft / 60) % 60;
          timeLeft -= minutes * 3600;

          let seconds = timeLeft % 60;

          console.log(project.projectid);
          

          return(
            <div key={project.projectid + 'div'}>
              <form action={deleteProj} key={project.projectid + 'form'} className="w-[15em] rounded-md flex flex-col gap-2 p-2 bg-[--lightBlue]">

                <input type="hidden" name="id" value={project.projectid} />
                
                <div className="flex flex-col items-center gap-2 p-1" key={project.projectid + 'div2'}>
                  
                  <div className="bg-[--offWhite] rounded-sm w-[13.5em] flex justify-center items-center flex-col gap-1 py-2">
                    <h2 className="text-[#3A4756] inconsolata-500 text-xl">project name:</h2>
                    <div className="bg-[#3A4756] h-0.5 w-28 mb-2"></div>
                    <h2 className="text-[#3A4756] text-2xl" key={project.projectid}><b>{project.projectname}</b></h2>
                  </div>
                  
                  <div className="bg-[--offWhite] rounded-sm w-[13.5em] flex justify-center items-center flex-col gap-1">
                    <h2 className="text-[#3A4756] text-2xl tracking-widest py-2" key={project.projectid}><b>{hours}:{minutes}:{seconds} h</b></h2>
                  </div>
                </div>

               

                <div className="w-full flex justify-center gap-1" key={project.projectid + 'div3'}>
                  <Link href={"/proj/" + project.projectid} className="text-lg border-2 border-slate-300 bg-slate-500 text-slate-700 px-1 rounded rotate-180" key={project.projectid + 'link'}><b>✐</b></Link>
                  <button type='submit' className="border-2 border-slate-300 bg-slate-500 text-slate-700 px-2 rounded" key={project.projectid + 'button'}><b>x</b></button>
                </div>
              </form>
            </div>
          )})}
        <ExtendedHome />
      </main>
    </div>
  )
}