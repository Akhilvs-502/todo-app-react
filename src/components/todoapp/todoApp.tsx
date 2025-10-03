import { useState } from 'react'
import "./TodoApp.css"
export default function TodoApp() {
  const dataArray = {
    input: "",
    tasks: [],
    editIndex: -1,
    editValue: ""
  }
  const [data, changeData] = useState(dataArray)
  const inputChange = (event: any) => {
    changeData({ ...data, input: event.target.value })
  }


  const { input, tasks } = data
  const addToList = () => {
    console.log(input);
    let inputValue = input.trim()
    if (inputValue) {
      let currentTask = tasks
      currentTask.push({ task: inputValue, status:false })

      changeData({ ...data, tasks: currentTask })
      changeData({ ...data, input: "" })

    } else {
      alert("type any input")
    }
  }
  const deleteTask = (key: any) => {
    console.log(key);
    const deletedTask = data.tasks.filter((value, index) => {
      return index != key
    })
    changeData({ ...data, tasks: deletedTask })
  }

  const openEdit = (index: any) => {
    const taskObj = data.tasks[index]
    changeData({ ...data, editIndex: index, editValue: taskObj.task })
  }

  const editInput = (event: any) => {
    changeData({ ...data, editValue: event.target.value })

  }
  const editSubmit = (event: any) => {
    event.preventDefault()
    let editArray = data.tasks.map((value, index) => {
      return index == data.editIndex ? { ...value, task: data.editValue } : value
    })

    changeData({ ...data, tasks: [...editArray], editIndex: -1 })


  }

  const completeTaskToggle = (index: any) => {
    let editArray = data.tasks.map((value, mapIndex) => {
      return mapIndex == index ? { ...value, status:!value.status } : value
    })
    changeData({ ...data, tasks: [...editArray], editIndex: -1 })
    console.log({ ...data, tasks: [...editArray], editIndex: -1 });

  }




  // const {tasks,input,editIndex,editValue}=datas
  //     useEffect(()=>{
  // console.log(input);

  //     },[input])
  return (
    <div className='todo'>
      <div className='todo-container'>
        <h1>TodoApp</h1>
        <div className='input-section'>
          <input placeholder='add new task here' value={input} onChange={inputChange} className='inputSection' type="text" name="input" id="" />
          <button onClick={addToList}>add </button>

        </div>

        <ul>
          {
            data.tasks.map((task, index) => {
              return <li key={index} className=''>
                {task.status == false ? <h4>{task.task}</h4> : <strike>{task.task}</strike>}
                <div ><button onClick={() => completeTaskToggle(index)} >{task.status ? "undo complete" :"complete"}</button>
                  <button onClick={() => openEdit(index)} ><img className='svgImage' src="public/edit-3-svgrepo-com.svg" alt="" /></button>
                  <button onClick={() => deleteTask(index)}><img className='svgImage' src="edit-delete-svgrepo-com (1).svg" alt="" /></button></div>
              </li>
            })
          }
        </ul>
      </div>
      <div className='todo'>
        <form action="">
          {data.editIndex !== -1 && <div className='edit-container'>
            <h3>editing task </h3>
            <input name='editInput' className='editInput' onChange={editInput} type="text" value={data.editValue} />
            <button className='editBtn' onClick={editSubmit}>submit</button>
          </div>}
        </form>

      </div>
    </div>


  )

}


