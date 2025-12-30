
const Select = ({ todoType, setterMethod }) => {
    return (
        <select value={todoType} onChange={(e) => setterMethod(e.target.value)}>
            <option value="todo">todo</option>
            <option value="completed">completed</option>
            <option value="backlog">backlog</option>
        </select>
    )
}

export default Select;