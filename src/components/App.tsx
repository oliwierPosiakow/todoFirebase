import '../css/app.css'
import shoppingImg from '../assets/shopping.png'
import {Todo} from "../Todo";
import {useState, useEffect} from "react";
// @ts-ignore
import {UserAuth} from '../context/AuthContext.jsx'
import {useNavigate} from "react-router-dom";
// @ts-ignore
import {db} from '../firebase.js'
import {query, collection, onSnapshot, updateDoc, deleteDoc, addDoc, doc} from 'firebase/firestore'
function App() {
    //states
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [option, setOption] = useState('work')

    //getting user
    const {user, logout} = UserAuth()
    const navigate = useNavigate()

    const username: string[] = user.email.split('@')

    //getting a data from firebase based on user email
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

    //changing todo state
    const toggleComplete = async (todo: {id: string,  completed: boolean}) => {
        const userEmail: string = user.email
        await updateDoc(doc(db, userEmail, todo.id), {
            completed: !todo.completed
        })
    }

    //creating a new todo in a db
    const createTodo = async (e: any) => {
        e.preventDefault(e)
        if(input.trim() != ''){
            const userEmail = user.email
            await addDoc(collection(db,userEmail), {
                text: input,
                completed: false,
                type: option,
            })
            setInput('')
        }
    }

    //deleting a todo from db
    const deleteTodo = async (id: string) => {
        const userEmail: string = user.email
        await deleteDoc(doc(db, userEmail, id))
    }

    //handling a logout
    const handleLogout = async () => {
        try{
            await logout()
            navigate('/')

        }catch(e){ /* empty */ }
    }

    return (
        <>
            {user &&
            <div className="user_wrapper">
                <p className='user_wrapper__hello'>
                    Hello, <span>{username[0]}</span>!
                </p>
                {todos.length != 0 &&
                    <p className='main__p'>
                        You have <span>{todos.length} </span>
                        todo{todos.length > 1 ? 's' : ''}
                    </p>
                }
                <button className='user_wrapper__logout'  onClick={handleLogout}>Logout</button>
            </div>}
          <main className="main">
              <img className="main__img" src={shoppingImg} alt="Man shopping with a cart."/>
              <form className="form" onSubmit={createTodo}>
                  <div className="input-wrapper">
                      <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="form__input"
                          type="text"
                          id="todo-name"
                          placeholder="Buy Bread, Pet Cat ..."
                      />
                      <select
                          id='todo-category'
                          name='category'
                          value={option}
                          className='form__input'
                          onChange={(e) => setOption(e.target.value)}
                      >
                          <option className='work' value="work">Work</option>
                          <option className='home' value="home">Home</option>
                          <option className='school' value="school">School</option>
                          <option className='hobby' value="hobby">Hobby</option>
                          <option className='other' value="other">Other</option>
                      </select>
                  </div>
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
          </main>
        </>
    )
}
export default App
