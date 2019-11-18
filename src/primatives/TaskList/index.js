import React from 'react'
import { API, graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react'

import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import * as mutations from '../../graphql/mutations';

import AddTask from '../AddTask'

export default function TaskList(props) {
    async function handleDelete(taskId) {
        const deletedTask = await API.graphql(graphqlOperation(mutations.deleteTask, {input: {id: taskId }}))
        console.log({deletedTask})

        // LLO: Need to update cache here
    }

    const TaskListView = (props) => {
        const { tasks } = props
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => {
                            return (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.value}</td>
                                    <td onClick={() => handleDelete(task.id)}>X</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

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