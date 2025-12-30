import { RiDeleteBin2Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { TbEditOff } from "react-icons/tb";
import Select from "./Select";
import { useEffect, useState } from "react";
import { useTodoContext } from "../context/TodoContext";

const TodoCard = ({ todoObj, isEditingSetterState, parentEditHandlerFnc }) => {

    const [currentTodoStatus, setCurrentTodoStatus] = useState(todoObj?.type);
    const [whileEditing, setWhileEditing] = useState(false);

    const { dispatch, ACTIONS } = useTodoContext();


    const handleDelete = (event) => {
        event?.preventDefault?.();

        // deletion will perform here
        if (event.target.tagName === 'path') {
            const todo_id = event.target.parentElement.getAttribute('data-id')
            console.log("PATH element clicked for Removing Todo", todo_id);
            dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo_id } });
        } else {
            const todo_id = event.target.getAttribute('data-id');
            console.log("SVG element clicked for Removing Todo", todo_id);
            dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo_id } });
        }
    }

    // edit handler
    const whileEditingOnTodoCard = () => {
        setWhileEditing(prev => !prev);
    }

    useEffect(() => {
        isEditingSetterState(whileEditing);
        if (whileEditing) {
            parentEditHandlerFnc(todoObj);
        }
    }, [whileEditing]);


    useEffect(() => {
        if (whileEditing) {
            setWhileEditing(false)
        }
    }, [todoObj]);


    useEffect(() => {
        if (todoObj?.type === currentTodoStatus) {
            console.warn("passed todo type and got todo type is same!");
            return;
        }

        // Now updating the todo type status to reducer
        dispatch({
            type: ACTIONS?.EDIT_TODO_STATUS,
            payload: {
                id: todoObj?.id,
                type: currentTodoStatus
            }
        })
        console.log(currentTodoStatus, todoObj.id)
    }, [currentTodoStatus]);

    return (
        <div className={`todo-card ${whileEditing ? 'isEditingOn' : ''}`}>
            <p>{todoObj?.content}</p>
            <hr />
            <div className="todo-card-foot">
                <div>
                    {/* tags here */}
                    {todoObj?.tags?.map((tag, index) => <button key={index} className="tag-btn" type="button">{tag}</button>)}
                </div>
                <div>
                    <Select todoType={currentTodoStatus} setterMethod={setCurrentTodoStatus} />
                    <div>
                        {whileEditing ?
                            <TbEditOff size={20} cursor={'pointer'} color="crimson" style={{ marginRight: '5px' }} onClick={whileEditingOnTodoCard} /> :
                            <FaEdit size={20} cursor={'pointer'} color="goldenrod" style={{ marginRight: '5px' }} onClick={whileEditingOnTodoCard} />}
                        <RiDeleteBin2Line className="delete-btn" data-id={todoObj?.id} size={20} cursor={'pointer'} onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoCard;