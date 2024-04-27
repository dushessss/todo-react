import Task from "./Task.tsx";
import React, {createRef} from "react";
type TaskListState = {
    tasks: string[]
}

class TaskList extends React.Component<object,TaskListState>{
    inputId: React.RefObject<HTMLTextAreaElement>;
    constructor(props: never) {
        super(props);
        this.state = {
            tasks: []
        }
        this.inputId = createRef<HTMLTextAreaElement>();
    }

    deleteTask = (index:number) =>{
        const tasks:string[] = [...this.state.tasks];
        tasks.splice(index,1);
        this.setState({tasks});
    }

    updateTask = (index:number, content:string)=>{
        const tasks:string[] = [...this.state.tasks];
        tasks[index] = content;
        this.setState({tasks});
    }

    handleClickAddNewTask =()=>{
        const tasks = [...this.state.tasks, this.inputId.current!.value];
        this.inputId.current!.value = "New Task";
        this.setState({tasks});
    }

    render () {
        return (
            <div className='field'>
                <textarea ref={this.inputId} defaultValue={"New Task"}></textarea>
                <button className='btn new' onClick={this.handleClickAddNewTask}>Add Task</button>
                {this.state.tasks.map((t:string,i:number) => <Task key={i+1} index={i}
                                                                   deleteTask={this.deleteTask}
                                                                   updateTask={this.updateTask}>{t}</Task>)}
            </div>
        )
    }
}


export default TaskList;