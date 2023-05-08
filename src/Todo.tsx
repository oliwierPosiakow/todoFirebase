import './css/todo.css'
import {FaTrashAlt} from 'react-icons/fa'
export function Todo(props: any) {
    return (
        <li className="listItem">
            <div className="row" style={{background: props.todo.completed && 'lightgrey'}}>
                <input onChange={() => props.toggleComplete(props.todo)} id={props.todo.id} type="checkbox" checked={!!props.todo.completed} />
                <label className={props.todo.completed ? 'completed' : ''} onClick={() => props.toggleComplete(props.todo)} htmlFor={props.todo.id}>
                    {props.todo.text}
                </label>
                <button onClick={() => props.deleteTodo(props.todo.id)} className="row__button">{<FaTrashAlt />}</button>
            </div>
        </li>
    );
}