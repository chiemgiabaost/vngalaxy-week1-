import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/todos")
            .then(res => {
                setData(res.data.todos); // Assuming `todos` is the array in the response
                console.log(res.data.todos);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold text-gray-600'>To-Do-List</h1>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
                    <a href='/create'>Create</a>
                </button>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-gray-600'>Task ID</th>
                        <th className='border border-gray-600'>Action</th>
                        <th className='border border-gray-600'>Status</th>
                        <th className='border border-gray-600'>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( (item, index) => (
                        <tr key= {item.id}>
                            <td className='border border-grey-500 text-center rounded-md'>{item.id}</td>
                            <td className='border border-grey-500 text-center rounded-md'>{item.todo}</td>
                            <td className='text-center'>{item.completed  ? <div className='bg-green-600 rounded-lg'><TiTick className='text-3xl  w-full  text-white'/></div> : <div className='bg-red-500 py-1 rounded-lg'><ImCross className='text-xl text-center w-full '/></div>}</td>
                            <td className='text-center border border-grey-500 rounded-md'>{item.userId}</td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
