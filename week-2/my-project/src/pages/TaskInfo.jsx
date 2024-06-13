import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
const TaskInfo = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [userId, setUserId] = useState(0);
    const [completed, setCompleted] = useState(Boolean);
    const [date, setDate] = useState();
    const {id} = useParams();
    useEffect( () => {
        axios.get(`https://666b16b87013419182d237c9.mockapi.io/task/${id}`)
            .then( res => {
                setTodo(res.data.task);
                setCompleted(res.data.status);
                setDate(res.data.createdAt);
            })
            .catch( err => {
                console.log(err);
            })
    
    })

  return (
    <div className='p-4'>
        <BackButton/>
        
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4 '>
                <h1 className='text-center font-bold text-2xl'>Add New Task</h1>
                <div className='flex space-x-1 my-2'>
                    <label>Task:<br/> </label>
                    <p>{todo}</p>
                </div>
                <div className='flex space-x-1 my-2' >
                    <label>Status: <br/></label>
                    <p>{completed? "Complete": "Incompleted"}</p>
                </div>
                <div className='flex space-x-1 my-2' >
                    <label>Create at: <br/></label>
                    <p>{date}</p>
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default TaskInfo