import { deleteData, getAll, getData, saveData } from '@/utils/handleDB';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';
import React from 'react'

export default async function home() {
  const data = await getAll();
  const projData = await getData();
  revalidateTag('project');
    
  const create = async (formData:FormData)=> {
    'use server'    
    const name = formData.get('name') as string
    const timespent = Number(formData.get('timespent'));
      
    const data = await saveData(name, timespent);
    revalidateTag('project');
  }
    
  const deleteProj = async (formData:FormData)=> {
    'use server'
    const id = Number(formData.get('id'));
    const data = await deleteData(Number(id))
    revalidateTag('project') 
  }
    
    return (
      <div className="h-screen w-full flex justify-center items-center flex-col bg-slate-800 gap-10">
      <div className="flex items-center flex-col">
        <h1 className="text-xl text-white"><b>PROJECTS</b></h1>

        <form action={create} className="flex flex-col justify-center items-center gap-1 w-60 text-white">
          <h2>Add project</h2>
          <input 
            type="text" 
            name="name" 
            className="text-black px-2 rounded-sm"
            placeholder="Project name"
            />
          <button className="w-36 border-white border-2 bg-slate-600 rounded">Add project</button>
        </form>
      </div>
      
      <div className="w-5/6 min-h-38 flex justify-start items-start flex-wrap gap-3 bg-slate-600 p-3 text-white">
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
              <form action={deleteProj} key={project.projectid + 'form'} className="h-2/12 flex flex-col gap-2 max-w-40 border-2 border-white p-2">
                <input type="hidden" name="id" value={project.projectid} />
                
                <div className="flex flex-col items-center" key={project.projectid + 'div2'}>
                  <h2 key={project.projectid}><b>{project.projectname};</b></h2>
                  <h2 key={project.projectid}>{hours}h {minutes}min {seconds}s</h2>
                </div>

                <div className="w-full flex justify-center gap-1" key={project.projectid + 'div3'}>
                  <Link href={"/proj/" + project.projectid} className="text-lg border-2 border-slate-300 bg-slate-500 text-slate-700 px-1 rounded rotate-180" key={project.projectid + 'link'}><b>✐</b></Link>
                  <button type='submit' className="border-2 border-slate-300 bg-slate-500 text-slate-700 px-2 rounded" key={project.projectid + 'button'}><b>x</b></button>
                </div>
              </form>
            </div>
            
          )})}
      </div>
    </div>
  )
}
