'use client'
import { getCategData, onSubmit } from '@/utils/timer';
import { getPrevious } from '@/utils/handleDB';
import { useEffect, useState } from 'react';

type myData = {
    previousTimeSpent: number,
    params: {
        id: number,
        name: string,
    },
    data: any,
}

type CategoryData = {
    id: number,
    name: string,
}

export default function Timer({previousTimeSpent, params, data}: myData) {
    const [timer, setTimer] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [sessionTimeSpent, setSessionTimeSpent] = useState(0);
    const [category, setCategory] = useState<CategoryData[]>([]);
    
    let hours = Math.floor((timeSpent + previousTimeSpent + sessionTimeSpent) / 3600);
    let minutes = Math.floor((timeSpent + previousTimeSpent + sessionTimeSpent) / 60) % 60;
    let seconds = (timeSpent + previousTimeSpent + sessionTimeSpent) % 60;


    function callBack(e: string) {
        const current = Number(e);
        
        getCategData(current).then((categData) => {
            const id = categData[0].id;
            const name = categData[0].name;

            const categoryData: CategoryData = {id: id, name: name}

            setCategory([categoryData]);
        })
    }
    
    function startTimer() {
        console.log('timer started');
        
        setTimeSpent(0)
        setTimer(true);
    }

    function stopTimer() {
        console.log('timer stopped');
        setSessionTimeSpent(sessionTimeSpent + timeSpent);
        
        setTimeSpent(0)
        setTimer(false);
    }
    
    useEffect(()=> {
        let interval = null;
        if (timer) {
            interval = setInterval(()=> {
                getPrevious(params.id)
                setTimeSpent((prevTime) => prevTime + 1);
                console.log(timeSpent);
                
            }, 1000);
        }
        
        return () => clearInterval(interval!);
    }, [params.id, timer, timeSpent]);

  return (
    <div>
        <select onChange={(e) => callBack(e.target.value)} name="category" className="text-black text-md px-2 py-1 rounded-sm border-2 border-blue-300">

            <option className="text-gray-100">Select category</option>

            {data.map((category: any) => (
                <option value={category.id} key={category.id} className="text-black border-2 border-blue-400">
                    {category.name}
                </option>
            ))}
        </select>
        
        <form action={onSubmit}>
            <div className="flex items-center justify-center p-2 text-lg bg-slate-700 text-white rounded tracking-wider"><b> {hours}h,  {minutes}min, {seconds}sec</b></div>
            <input name="project_id" value={params.id} type="hidden" />

            {category.length > 0 && (
                <>
                    <input name="category_id" value={category[0].id} type="hidden" />
                    <input name="timespent" value={timeSpent + sessionTimeSpent} type="hidden" />
                </>
            )}

            <div className="flex items-center justify-center gap-2">
                <button type='button' onClick={startTimer} name="start" className="w-20 border-2 bg-slate-700 border-slate-400 rounded">Start</button>
                <button type='submit' value='Submit' onClick={stopTimer} name="stop" className="w-20 border-2 bg-slate-700 border-slate-400 rounded">Pause</button>
            </div>  
        </form>

        {category.length > 0 && (
            <div>
                <h1>id: {category[0].id}</h1>
                <h1>name: {category[0].name}</h1>
            </div>
        )}
    </div>
  )
}
