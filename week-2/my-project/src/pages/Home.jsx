import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import { Link } from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://666b16b87013419182d237c9.mockapi.io/task")
            .then(res => {
                setData(res.data); // Assuming `todos` is the array in the response
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const handleDelete = (id) => {
        axios.delete(`https://666b16b87013419182d237c9.mockapi.io/task/${id}`)
            .then(res => {
                setData(data.filter(item => item.id !== id));
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold text-gray-600'>To-Do-List</h1>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
                    <Link to={`/create`}>New Task</Link>
                </button>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-gray-600'>Task ID</th>
                        <th className='border border-gray-600'>Action</th>
                        <th className='border border-gray-600'>Status</th>
                        <th className='border border-gray-600'>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( (item, index) => (
                        <tr key= {item.id}>
                            <td className='border border-grey-500 text-center rounded-md'>{item.id}</td>
                            <td className='border border-grey-500 text-center rounded-md'>{item.task}</td>
                            <td className='text-center'>{item.status  ? <div className='bg-green-600 rounded-lg'><TiTick className='text-3xl  w-full  text-white'/></div> : <div className='bg-red-500 py-1 rounded-lg'><ImCross className='text-xl text-center w-full '/></div>}</td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                <Link to={`/task/${item.id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800'/>
                                </Link>
                                <Link to={`edit/${item.id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-800'/>
                                </Link>
                                <button onClick={() => handleDelete(item.id)}>
                                    <MdOutlineDelete className='text-2xl text-red-800'/>
                                </button>
                                </div>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
