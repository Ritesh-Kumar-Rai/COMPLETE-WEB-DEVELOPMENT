import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import TodoCard from './components/TodoCard'
import { useTodoContext } from './context/TodoContext'
import Select from './components/Select'


const tags = ["HTML", "CSS", "JAVASCRIPT", "REACT", "DEVELOPMENT", "NODEJS", "CODING", "DOCKER"];

function App() {

  const [todoContent, setTodoContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [todoType, setTodoType] = useState('todo');
  const [isEditing, setIsEditing] = useState(false);
  const [afterEditionTodoId, setAfterEditionTodoId] = useState(null);

  const handleTagButtonClick = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        // const index = selectedTags.indexOf(tag);
        return prev.filter((eachTag) => eachTag !== tag);

      }
      return [...prev, tag]
    });
  }

  const { todos, dispatch, ACTIONS } = useTodoContext();


  const onTodoSave = () => {
    const todo_obj = {
      id: new Date().toISOString(),
      content: todoContent,
      tags: [...selectedTags],
      type: todoType
    };

    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: todo_obj
    });

    // resseting all state values
    setSelectedTags([])
    setTodoContent('')
    setTodoType('todo')
  };

  const onEditingHandler = (currTodoObj) => {
    setTodoContent(currTodoObj.content)
    setSelectedTags(currTodoObj.tags)
    setTodoType(currTodoObj.type)

    setAfterEditionTodoId(currTodoObj.id)
  }


  const onEditSave = () => {
    if (afterEditionTodoId) {
      console.warn("Array, `ID` hi nahi mila mere ko!")
    }
    dispatch({
      type: ACTIONS.EDIT_TODO,
      payload: {
        id: afterEditionTodoId,
        body: {
          content: todoContent,
          tags: [...selectedTags],
          type: todoType
        }
      }
    });

    setIsEditing(false);
    setAfterEditionTodoId(null);
    setTodoContent('')
    setSelectedTags([])
    setTodoType('todo')

  }

  return (
    <>
      <Header />
      <main>

        <section className="container text-center">
          <input type="text" value={todoContent} onChange={(e) => setTodoContent(e.target.value)} />
          <div id='todo-header'>
            <div>
              {tags?.map(tag => <button className={`tag-btn ${selectedTags.includes(tag) ? 'bg-black' : ''}`} key={tag} type="button" onClick={() => handleTagButtonClick(tag)}>{tag}</button>)}
            </div>
            <div>
              <Select todoType={todoType} setterMethod={setTodoType} />
              {isEditing ? <button id='edit-task-btn' type='button' onClick={onEditSave}>Save Edited Todo</button> : <button id='add-task-btn' type='button' onClick={onTodoSave}>Add Task</button>}
            </div>
          </div>
        </section>

        <section className='todo-container'>
          <div>
            <h3>🎯In Progress</h3>
            <div className='all-todos'>
              {/* your todo cards will render here... */}
              {todos.map(todo => todo.type === 'todo' && <TodoCard key={todo.id} parentEditHandlerFnc={onEditingHandler} isEditingSetterState={setIsEditing} todoObj={todo} />)}
            </div>
          </div>
          <div>
            <h3>🌟Completed</h3>
            <div>
              {/* your todo cards will render here... */}
              {todos.map(todo => todo.type === 'completed' && <TodoCard key={todo.id} parentEditHandlerFnc={onEditingHandler} isEditingSetterState={setIsEditing} todoObj={todo} />)}
            </div>
          </div>
          <div>
            <h3>💢Backlog</h3>
            <div>
              {/* your todo cards will render here... */}
              {todos.map(todo => todo.type === 'backlog' && <TodoCard key={todo.id} parentEditHandlerFnc={onEditingHandler} isEditingSetterState={setIsEditing} todoObj={todo} />)}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default App
