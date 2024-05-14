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
    <div>
      <h1>All category data</h1>
      <ul>
      {data.map((category: any) => (
        <li key={category.category_id}>
          {category.name}: {category.sum} seconds
        </li>
      ))}
      </ul>
    </div>
  )
}
