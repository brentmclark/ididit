import React from 'react'
import Amplify, { graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react'

import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';

import AddTask from '../AddTask'

export default function TaskList(props) {
    const TaskListView = (props) => {
        const { tasks } = props
        return tasks.map(task => {
            return (
                <div key={task.id}>
                    {task.title} | {task.value}
                </div>
            )
        })
    }

    return (
        <>
            <Connect
                query={graphqlOperation(queries.listTasks)}
                subscription={graphqlOperation(subscriptions.onCreateTask)}
                onSubscriptionMsg={(prev, { onCreateTask }) => {
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