import React from 'react'
import { API, graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react'

import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import * as mutations from '../../graphql/mutations';

import AddTask from '../AddTask'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
} from '@material-ui/core';

 import { DeleteTwoTone, EditTwoTone, SaveTwoTone } from '@material-ui/icons';

function TaskListView(props) {
    const { tasks } = props
    const [editableTaskId, setEditableTaskId] = React.useState(null)
    const [selected, setSelected] = React.useState([]);

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
    
    const numSelected = selected.length
    const rowCount = tasks.length

    function onSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = tasks.map(task => task.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function onSelectClick(event, taskId) {
        const newSelected = selected.slice(0)
        if (event.target.checked) {
            newSelected.push(taskId)
            setSelected(newSelected)
            return
        }
        const taskIndex = newSelected.findIndex(s => s === taskId)
        newSelected.splice(taskIndex, 1)
        setSelected(newSelected)
        return
    }

    return (
        
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{ 'aria-label': 'select all desserts' }}
                            />
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Points</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map(task => {
                        const contentIsEditable = editableTaskId === task.id
                        return (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Checkbox
                                        onClick={event => onSelectClick(event, task.id)}
                                        checked={selected.findIndex(s => s === task.id) > -1}
                                        inputProps={{ 'aria-labelledby': 'task-title' }}
                                    />
                                </TableCell>
                                <TableCell contentEditable={contentIsEditable} id="task-title">{task.title}</TableCell>
                                <TableCell contentEditable={contentIsEditable} align="right">{task.value}</TableCell>
                                <TableCell>
                                    {contentIsEditable 
                                        ? <SaveTwoTone onClick={() => setEditableTaskId(null)} />
                                        : <EditTwoTone onClick={() => setEditableTaskId(task.id)} />
                                    }
                                    <DeleteTwoTone onClick={() => deleteTask(task.id)} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
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
