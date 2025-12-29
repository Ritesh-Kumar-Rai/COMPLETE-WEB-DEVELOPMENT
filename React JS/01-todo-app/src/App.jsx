import { useState } from 'react'
import './App.css'
import Footer from './Footer'
import Header from './Header'
import TodoCard from './TodoCard'

function App() {

  return (
    <>
      <Header />
      <main>

        <section className="container text-center">
          <input type="text" name="" id="" />
          <div id='todo-header'>
            <div>
              <button type="button">HTML</button>
              <button type="button">CSS</button>
              <button type="button">JAVASCRIPT</button>
              <button type="button">REACT</button>
            </div>
            <div>
              <select name="" id="">
                <option value="todo">todo</option>
                <option value="completed">completed</option>
                <option value="backlog">backlog</option>
              </select>
              <button id='add-task-btn' type='button'>Add Task</button>
            </div>
          </div>
        </section>

        <section className='todo-container'>
          <div>
            <h3>🎯In Progress</h3>
            <div className='all-todos'>
              {/* your todo cards will render here... */}
              <TodoCard />
            </div>
          </div>
          <div>
            <h3>🌟Completed</h3>
            <div>
              {/* your todo cards will render here... */}
            </div>
          </div>
          <div>
            <h3>💢Backlog</h3>
            <div>
              {/* your todo cards will render here... */}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default App
