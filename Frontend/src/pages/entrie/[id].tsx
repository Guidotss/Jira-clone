import { useContext, useReducer, useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { useForm } from 'react-hook-form';

import { EntriesContext } from '@/context';
import { getEntryById } from '@/db';
import { EntryStatus } from '@/interfaces';
import { useRouter } from 'next/router';
import { GarbageCanIcon } from '@/components';

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
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false); 


    const { register, handleSubmit, formState:{errors} } = useForm<EntryForm>();
    const { updateEntry,deleteEntry } = useContext(EntriesContext); 
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


    const handleDelete = () => {
        deleteEntry(id);
        router.push('/');
    }

    return (
        <div className='flex flex-col items-center justify-center 2xl:mt-[200px] mt-20'>
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
                        className='bg-slate-700 w-[350px] rounded-lg p-1 mt-3 text-slate-50 text-lg px-2' 
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
            <button className='bg-red-500 p-5 rounded-full shadow-lg absolute right-10 bottom-10' onClick={() => setIsDeleteModalOpen(true)}>
                <GarbageCanIcon/>
            </button>
            <div className={`absolute z-20 shadow-2xl bg-opacity-50 ${isDeleteModalOpen ? 'block' : 'hidden'}`}>
                <div className='flex flex-col items-center justify-center bg-slate-700 rounded-lg w-[600px] h-[300px] shadow-lg'>
                    <h3 className='text-slate-50 text-xl'>
                        Are you sure you want to delete this entry?
                    </h3>
                    <div className='flex justify-center mt-5'>
                        <button className='bg-red-500 p-2 rounded-lg shadow-lg text-slate-50 hover:bg-red-600 transition w-[100px]' onClick={handleDelete}>
                            Yes
                        </button>
                        <button className='bg-green-500 p-2 rounded-lg shadow-lg text-slate-50 hover:bg-green-600 transition ml-5 w-[100px]' onClick={() => setIsDeleteModalOpen(false)}>
                            No
                        </button>
                    </div>
                </div>
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