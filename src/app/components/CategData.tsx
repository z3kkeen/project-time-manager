'use server'
import { getWorkLoad } from '@/utils/handleDB';
import React from 'react'

type ProjID = {
  params: {
    id: number
  };
}

export default async function CategData({ params }: ProjID) {
  const data = await getWorkLoad(Number(params.id));
  console.log(data);
    
  return (
    <div className="w-full py-8 bg-[--darkerBlue] text-[--darkerBlue] p-3 flex flex-col items-center gap-3">
      <h1 className="inconsolata-500 text-xl text-[--offWhite]"><b>All category data</b></h1>
      <ul>
        <li>
            <div className="flex text-md border-2 border-[--darkestBlue] justify-center items-center flex-row rounded-t-md">
            <div className="w-48 bg-[--darkestBlue] text-center border-r-2 border-[--lightBlue] text-[--offWhite] inconsolata-500">CATEGORY</div>
            <div className="w-36 text-center inconsolata-500 bg-[--darkestBlue] text-[--offWhite]">TIME SPENT</div>
          </div>
        </li>
        {data.map((category: any) => {

          let time = category.sum;
          let hours = Math.floor(time / 3600);
          time -= hours * 3600;

          let minutes = Math.floor(time / 60) % 60;
          time -= minutes * 3600;

          let seconds = time % 60;

          console.log(category.id);

          return(
            <li key={category.category_id} className="flex bg-[--offWhite] border-2 border-[--darkestBlue] items-center">
              <div className="w-48 pl-3 border-r-2 border-[--darkestBlue] text-[--darkerBlue] bg-[--offWhite] inconsolata-500">{category.name}</div>
              <div className="pl-3 w-36 inconsolata-500">{hours}h {minutes}min {seconds}s</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
