import React, {createRef} from "react";

type TaskProps = {
    children: string,
    key: number,
    index: number,
    deleteTask: (index: number) => void,
    updateTask: (index: number, content:string) => void,
}
type TaskState = {
    isEdit: boolean
}
class Task extends React.Component<TaskProps,TaskState>{
    textId: React.RefObject<HTMLTextAreaElement>;
    constructor(props:TaskProps) {
        super(props);
        this.state = {
            isEdit: false
        }
        this.textId = createRef<HTMLTextAreaElement>();
    }

    handleClickEdit = ()=>{
        this.setState({isEdit: true});
    }

    handleClickDelete = () =>{
        this.props.deleteTask(this.props.index);
    }
    renderView= ()=> {
        return (
            <div className='box'>
                <div>{this.props.children}</div>
                <button onClick={this.handleClickEdit} className='btn light'>Edit</button>
                <button onClick={this.handleClickDelete} className={'btn red'}>Delete</button>
            </div>
        );
    }
    handleClickSave = ()=>{
        const task = this.textId.current!.value;
        this.props.updateTask(this.props.index, task);
        this.setState({isEdit:false});
    }
    renderEdit = () => {
        return(
            <div className='box'>
                <textarea ref={this.textId} defaultValue={this.props.children}></textarea>
                <button className={"btn success"} onClick={this.handleClickSave}>Save</button>
            </div>
        );
    }
    render() {
        return (
            this.state.isEdit ? this.renderEdit() : this.renderView()
        )
    }
}

export default Task;