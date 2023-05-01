import { useContext, useReducer } from 'react';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { useForm } from 'react-hook-form';

import { EntriesContext } from '@/context';
import { getEntryById } from '@/db';
import { EntryStatus } from '@/interfaces';
import { useRouter } from 'next/router';

interface EntryPageProps { 
    id: string; 
    title: string; 
    description?: string; 
    status: string;
    updatedAt?: string; 
}

interface EntryForm {
    title: string;
    description: string;
    status: EntryStatus
}

const EntryPage:NextPage<EntryPageProps> = ({ id, title, description,status,updatedAt }) => {

    const { register, handleSubmit, formState:{errors} } = useForm<EntryForm>();
    const { updateEntry } = useContext(EntriesContext); 
    const router = useRouter(); 

    const onSubmit = (data: EntryForm) => {
        if(!data.title || !data.status) return;
        const entry = {
            id,
            title: data.title,
            description: data.description,
            status: data.status,
            updatedAt: new Date().toISOString()
        }
        updateEntry(entry);
    }

    return (
        <div className='flex flex-col items-center justify-center mt-[200px]'>
            <div className='absolute left-2 top-2'>
                <Link href='/' passHref legacyBehavior>
                    <a className='text-2xl text-slate-50'>← Volver</a>
                </Link>
            </div>
            <h1 className='text-4xl text-slate-50 rounded-lg'>Edit entry</h1>
            <div className='bg-slate-800 w-[600px] h-[400px] rounded-lg shadow-xl'>
                <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        className='bg-slate-700 w-[350px] rounded-lg p-2 mt-10 text-slate-50 text-lg'
                        {...register('title', { required: true })}
                        defaultValue={title}
                    />
                    {errors.title && <span className='text-red-500'>Title is required!</span>}
                    <textarea 
                        className='bg-slate-700 w-[350px] rounded-lg p-1 mt-3 text-slate-50 text-lg' 
                        rows={5}
                        {...register('description', { required: false })}
                        defaultValue={description}
                    />
                    <select 
                        className='bg-slate-700 w-[350px] rounded-lg p-1 mt-3 text-slate-50 text-lg'
                        {...register('status', { required: true })}
                        defaultValue={status}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In progress</option>
                        <option value="completed">Completed</option>
                    </select>                
                    { errors.status && <span className='text-red-500'>Status is required!</span> }
                    <button className='mt-2 border-[1px] w-[350px] rounded-lg border-yellow-500 text-slate-50 hover:bg-yellow-500 text-lg p-1 transition'>
                        Edit
                    </button>
                </form>
            </div>
        </div>
    )
}





export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query as { id: string };
    const entries = await getEntryById(id); 
    return {
        props: {
            ...entries
        }
    }
}

export default EntryPage