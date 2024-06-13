import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'

const CreateTask = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [userId, setUserId] = useState(0);
    const [completed, setCompleted] = useState(Boolean);
    const [date, setDate] = useState(new Date());
    const handleSubmit = () =>{
        setDate(new Date());
        fetch('https://666b16b87013419182d237c9.mockapi.io/task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: todo,
                status: completed,
                createdAt: date,


  })
})
.then(() => navigate('/'))
    }
  return (
    <div className='p-4'>
        <BackButton/>
        
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4 '>
                <h1 className='text-center font-bold text-2xl'>Add New Task</h1>
                <div className='flex space-x-1 my-2'>
                    <label>Task: </label>
                    <input 
                        type = "text"
                        value = {todo}
                        onChange={ (e) => setTodo(e.target.value)}
                        required
                        className='border-2 border-sky-400 rounded-md px-2 w-full'
                        placeholder={todo}
                    />
                </div>
                <div className='flex space-x-1 my-2' >
                    <label>Status: </label>
                    <select 
                        value = {completed}
                        onChange={ (e) => setCompleted(e.target.value)}
                        required
                        className='border-2 border-sky-400 rounded-md px-2 w-full'
                    >
                        <option value={false} >Incomplete</option>
                        <option value={true}>Complete</option>
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
  )
}

export default CreateTask