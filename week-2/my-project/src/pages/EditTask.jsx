import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';

const TaskInfo = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [completed, setCompleted] = useState(false);
    const [date, setDate] = useState('');
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://666b16b87013419182d237c9.mockapi.io/task/${id}`)
            .then(res => {
                setTodo(res.data.task);
                setCompleted(res.data.status);
                setDate(res.data.createdAt);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleSubmit = () => {
        setDate(new Date().toISOString());
        axios.put(`https://666b16b87013419182d237c9.mockapi.io/task/${id}`, {
            task: todo,
            status: completed,
            createdAt: date,
        })
        .then(() => {
            navigate(-1);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4 '>
                    <h1 className='text-center font-bold text-2xl'>Edit Task</h1>
                    <div className='flex space-x-1 my-2'>
                        <label>Task: </label>
                        <input
                            type="text"
                            onChange={(e) => setTodo(e.target.value)}
                            value={todo}
                            required
                            className='border-2 border-sky-400 rounded-md px-2 w-full'
                            placeholder='Enter Task'
                        />
                    </div>
                    <div className='flex space-x-1 my-2'>
                        <label>Status: </label>
                        <select
                            value={completed}
                            onChange={(e) => setCompleted(e.target.value === 'true')}
                            required
                            className='border-2 border-sky-400 rounded-md px-2 w-full'
                        >
                            <option value="false">Incomplete</option>
                            <option value="true">Complete</option>
                        </select>
                    </div>
                    <div className='justify-center max-w  flex'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskInfo;
