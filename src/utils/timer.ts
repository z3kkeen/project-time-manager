'use server'
import { getCateg, updateData } from "./handleDB"

type CategoryData = {
    id: number,
    name: string,
}

export const onSubmit = async (formData: FormData)=> {
    updateData(Number(formData.get('project_id')), Number(formData.get('category_id')), Number(formData.get('timespent'))); 
}


export const getCategData = async (current: number): Promise<CategoryData[]> => {
    return new Promise<CategoryData[]>((resolve) => {
        getCateg(current)
        .then((categData: CategoryData[]) => {
            const customCategories: CategoryData[] = categData.map((data) => ({
                id: data.id,
                name: data.name,
            }));
            resolve(customCategories);
        })
    });
}