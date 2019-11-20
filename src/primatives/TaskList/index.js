import React from 'react'
import { API, graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react'

import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import * as mutations from '../../graphql/mutations';

import AddTask from '../AddTask'

function TaskListView(props) {
    const { tasks } = props
    const [editableTaskId, setEditableTaskId] = React.useState(null)

    async function deleteTask(taskId) {
        const decision = window.confirm('Are you sure you want to delete this task?')
        if (decision) {
            const deletedTask = await API.graphql(graphqlOperation(mutations.deleteTask, {input: {id: taskId }}))
            window.location.reload()
            // TODO: Need to update cache here
        }
    }

    // TODO: Hook up edit flow
    async function editTask(taskId) {
        const editedTask = await API.graphql(graphqlOperation(mutations.updateTask, {input: {id: taskId }}))
        // window.location.reload()
        // TODO: Need to update cache here
    }
    

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Points</th>
                    <th colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(task => {
                        const contentIsEditable = editableTaskId === task.id
                        return (
                            <tr key={task.id}>
                                <td contentEditable={contentIsEditable}>{task.title}</td>
                                <td contentEditable={contentIsEditable}>{task.value}</td>
                                <td onClick={() => deleteTask(task.id)}>delete</td>
                                {
                                    contentIsEditable 
                                    ? <td onClick={() => setEditableTaskId(null)}>save</td>
                                    : <td onClick={() => setEditableTaskId(task.id)}>edit</td>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default function TaskList(props) {
    return (
        <>
            <Connect
                query={graphqlOperation(queries.listTasks)}
                subscription={graphqlOperation(subscriptions.onCreateTask)}
                onSubscriptionMsg={(prev, { onCreateTask }) => {
                    console.log({prev})
                    prev.listTasks.items.push(onCreateTask)
                    return prev; 
                }}
            >
                {({ data: { listTasks }, loading, errors }) => {
                    if (errors.length > 0) {return (<h3>Error</h3>)};
                    if (loading || !listTasks) {return (<h3>Loading...</h3>)};
                    return (<TaskListView tasks={listTasks.items} /> );
                }}
            </Connect>
            <AddTask />
        </>
    )
}
