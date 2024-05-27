'use client'
import { addProject, getUserSession } from "@/utils/handleDB";
import { revalidateTag } from "next/cache";
import { useState } from "react";

export default function ExtendedHome() {
  const [canShow, setCanShow] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const create = async (formData:FormData)=> {
    const session = getUserSession();
    const name = formData.get('name') as string

    addProject(name, (await session).user?.name);

    setCanShow(false);
    setShowButton(true);
    revalidateTag('project');
  }

  const showExtended = async ()=> {
    setShowButton(false);
    setCanShow(true);
  }

  const hide = async ()=> {
    setShowButton(true);
    setCanShow(false);
  }
    
  return (
    <div>
      {
        (showButton) &&
        <button onClick={showExtended} className="inconsolata-500 bg-[#535A62] text-[--offWhite] px-2 rounded-sm">+add project</button>
      }
      {
        (canShow) &&
          <form action={create} className="flex flex-col justify-center items-center gap-2 w-60 text-[--offWhite] bg-orange-200/50 rounded-sm p-2">
            <input 
              type="text" 
              name="name" 
              className="w-44 text-[--darkestBlue] bg-[--offWhite] px-2 rounded-sm"
              placeholder="Project name"
            />
            <div className="flex gap-1">
              <button onClick={hide} className="w-8 border-[--offWhite] border-2 bg-slate-600 rounded">x</button>
              <button type="submit" className="w-36 border-[--offWhite] border-2 bg-slate-600 rounded">Add project</button>
            </div>
            
          </form>
      }
      
    </div>
  )
}