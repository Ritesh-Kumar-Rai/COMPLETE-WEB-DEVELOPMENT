import { RiDeleteBin2Line } from "react-icons/ri";

const TodoCard = ({ todoObj }) => {

    const handleDelete = (event) => {
        event?.preventDefault?.();

        const todo_id = event.target.getAttribute('data-id');
        // deletion will perform here
    }

    return (
        <div className="todo-card">
            <p>{todoObj?.content}</p>
            <hr />
            <div className="todo-card-foot">
                <div>
                    {/* tags here */}
                    <button type="button">op</button>
                    {todoObj?.tags?.map((tag, index) => <button type="button">{tag}</button>)}
                </div>
                <RiDeleteBin2Line data-id={todoObj?.id} size={20} cursor={'pointer'} onClick={handleDelete} />
            </div>
        </div>
    )
}

export default TodoCard;