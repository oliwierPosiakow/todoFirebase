import './css/todo.css'
import {FaRegTrashAlt} from 'react-icons/fa'
export function Todo(props: any) {
    return (
        <li className="listItem">
            <div className='row' style={{background: props.todo.completed && '#e4e4e4'}}>
                <div className="left">
                    <input
                        onChange={() => props.toggleComplete(props.todo)}
                        id={props.todo.id}
                        type="checkbox"
                        checked={!!props.todo.completed}
                    />
                    <label
                        className={props.todo.completed ? 'completed' : ''}
                        onClick={() => props.toggleComplete(props.todo)}
                        htmlFor={props.todo.id}
                    >
                        {props.todo.text}
                    </label>
                </div>
                <div className="right">
                    <div className={'class ' + props.todo.type}></div>
                    <button onClick={() => props.deleteTodo(props.todo.id)} className="row__button">{<FaRegTrashAlt />}</button>
                </div>

            </div>
        </li>
    );
}