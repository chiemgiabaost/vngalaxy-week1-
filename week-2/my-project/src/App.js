import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook/>}></Route>
      <Route path="/books/delete/:id" element={<DeleteBook/>}></Route> */}
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTask />} />
    </Routes>
  );
}

export default App;
