import { todoApi } from "@/api"

export const getEntryById = async ( id: string ) => {
    try{
        const { data } = await todoApi.get(`entries/${id}`); 
        return data;
    }catch(error){
        console.log(error)
    }
}