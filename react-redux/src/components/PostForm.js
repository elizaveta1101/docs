import React from 'react'
import {connect} from 'react-redux'
import { createPost, showAlert } from '../redux/actions'
import { WarningAlert } from './WarningAlert'

class PostForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            title: ''
        }
    }

    submitHandler = event => {
        event.preventDefault()
        
        const {title} = this.state;

        //check empty string
        if (!title.trim()) {
            return this.props.showAlert('Пустое поле')
        }
        
        const newPost = {
            title, id: Date.now().toString()
        }

        this.props.createPost(newPost)
        this.setState({title: ''})
    }

    changeInputHandler = event => {
        event.persist()
        this.setState( prev => ({...prev, ...{
            [event.target.name]: event.target.value
        }}))
    }

    render() {
        return (
        <form onSubmit={this.submitHandler}>

            {this.props.alert && <WarningAlert message={this.props.alert} />}

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Заголовок поста</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="title"
                    value={this.state.title}
                    name="title"
                    onChange={this.changeInputHandler} 
                />
            </div>
            <button className="btn btn-success" type="submit">Создать</button>
        </form>
        )
    }
}

const mapDispatchToProps = {
    createPost, showAlert
} 

const mapStateToProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)