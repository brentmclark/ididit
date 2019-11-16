import React from 'react'
import Amplify, { graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react'

import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';

export default function TaskList(props) {
    const TaskListView = (props) => {
        const { tasks } = props
        return tasks.map(task => <span>{task.title}</span>)
    }

    return (
        <Connect query={graphqlOperation(queries.listTasks)}>
            {({ data: { listTasks }, loading, errors }) => {
                if (errors.length > 0) {return (<h3>Error</h3>)};
                if (loading || !listTasks) {return (<h3>Loading...</h3>)};
                return (<TaskListView tasks={listTasks.items} /> );
            }}
        </Connect>
    )
}