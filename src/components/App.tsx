import '../css/app.css'
import shoppingImg from '../assets/shopping.png'
import {Todo} from "../Todo";
import {useState, useEffect} from "react";
import {UserAuth} from '../context/AuthContext.jsx'
import {useNavigate} from "react-router-dom";
// @ts-ignore
import {db} from '../firebase.js'
import {query, collection, onSnapshot, updateDoc, deleteDoc, addDoc, doc} from 'firebase/firestore'
import {Navigate} from "react-router-dom";
function App() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const {user, logout} = UserAuth()
    const navigate = useNavigate()

    // @ts-ignore
    useEffect(() => {
        const userEmail: string = user.email
        const q = query(collection(db, userEmail))
        const unsubscribe = onSnapshot(q,(querySnapshot) => {
            // @ts-ignore
            const todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
            })
            // @ts-ignore
            setTodos(todosArr)
        })
        return () => unsubscribe
    },[])
    const toggleComplete = async (todo: {id: string,  completed: boolean}) => {
        const userEmail: string = user.email
        await updateDoc(doc(db, userEmail, todo.id), {
            completed: !todo.completed
        })
    }

    const createTodo = async (e: any) => {
        e.preventDefault(e)
        if(input.trim() != ''){
            const userEmail = user.email
            await addDoc(collection(db,userEmail), {
                text: input,
                completed: false,
            })
            setInput('')
        }
    }

    const deleteTodo = async (id: string) => {
        const userEmail: string = user.email
        await deleteDoc(doc(db, userEmail, id))
    }

    const handleLogout = async () => {
        try{
            await logout()
            navigate('/')

        }catch(e){

        }
    }

    return (
      <main className="main">
          <img className="main__img" src={shoppingImg} alt="Man shopping with a cart."/>
          <p>Hello {user && user.email}</p>
          <button  onClick={handleLogout}>Logout</button>
          <form className="form" onSubmit={createTodo}>
              <input value={input} onChange={(e) => setInput(e.target.value)} className="form__input" type="text" id="input-field" placeholder="Buy Bread, Pet Cat ..."/>
              <button className="form__button" id="add-button">Add to cart</button>
          </form>
          {todos.length === 0 && <p>Add some tasks!</p>}
          <ul>
              {
                  todos.map((todo, index)=> {
                      return <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
                  })
              }

          </ul>
          {todos.length != 0 && <p className='main__p'>You have {todos.length} todo{todos.length > 1 ? 's' : ''}</p>}
      </main>
    )
}

export default App
