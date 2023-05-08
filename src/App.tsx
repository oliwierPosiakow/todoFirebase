import './css/app.css'
import shoppingImg from './assets/shopping.png'
import {Todo} from "./Todo";
import {useState, useEffect} from "react";
// @ts-ignore
import {db} from './firebase.js'
import {query, collection, onSnapshot, updateDoc, deleteDoc, addDoc, doc} from 'firebase/firestore'
function App() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    // @ts-ignore
    useEffect(() => {
        const q = query(collection(db, 'todos'))
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
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    }

    const createTodo = async (e: any) => {
        e.preventDefault(e)
        if(input.trim() != ''){
            await addDoc(collection(db,'todos'), {
                text: input,
                completed: false,
            })
            setInput('')
        }
    }

    const deleteTodo = async (id: string) => {
        await deleteDoc(doc(db, 'todos', id))
    }

    return (
      <main className="main">
          <img className="main__img" src={shoppingImg} alt="Man shopping with a cart."/>
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
