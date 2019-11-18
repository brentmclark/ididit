import React from 'react'
import { Connect } from 'aws-amplify-react'
import { graphqlOperation }  from "aws-amplify";
import * as mutations from '../../graphql/mutations'

export default function AddTask(props) {
    return (
        <Connect mutation={graphqlOperation(mutations.createTask)}>
          {({mutation}) => (
            <AddTaskView createTask={mutation} />
          )}
        </Connect>
    )
}

function AddTaskView(props) {
    async function handleSubmit(event) {
        event.preventDefault()
        const input = {
            title: event.target.elements[0].value,
            value: event.target.elements[1].value,
        }
        try {
            await props.createTask({input})
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Task</h3>
            <div>
                <label htmlFor="taskName">Name</label>
                <input type="text" name="taskName" id="taskName" />
            </div>
            <div>
                <label htmlFor="taskValue">Points</label>
                <input type="text" name="taskValue" id="taskValue" />
            </div>
            <button type="submit">Add Task</button>
        </form>
    )
}