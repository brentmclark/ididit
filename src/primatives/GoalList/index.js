import React from 'react'
import { API, graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react'

import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import * as mutations from '../../graphql/mutations';

import AddGoal from '../../primatives/AddGoal'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

 import { DeleteTwoTone, EditTwoTone, SaveTwoTone } from '@material-ui/icons';


function GoalListView(props) {
    const { goals } = props
    const [editableGoalId, setEditableGoalId] = React.useState(null)

    async function deleteGoal(goalId) {
        const decision = window.confirm('Are you sure you want to delete this goal?')
        if (decision) {
            const deletedGoal = await API.graphql(graphqlOperation(mutations.deleteGoal, {input: {id: goalId }}))
            window.location.reload()
            // TODO: Need to update cache here
        }
    }

    // TODO: Hook up edit flow
    async function editGoal(goalId) {
        const editedGoal = await API.graphql(graphqlOperation(mutations.updateGoal, {input: {id: goalId }}))
        // window.location.reload()
        // TODO: Need to update cache here
    }
    

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Objective</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {goals.map(goal => {
                    const contentIsEditable = editableGoalId === goal.id
                    return (
                        <TableRow key={goal.id}>
                            <TableCell contentEditable={contentIsEditable}>{goal.name}</TableCell>
                            <TableCell contentEditable={contentIsEditable} align="right">{goal.objective}</TableCell>
                            <TableCell>
                                {contentIsEditable 
                                    ? <SaveTwoTone onClick={() => setEditableGoalId(null)} />
                                    : <EditTwoTone onClick={() => setEditableGoalId(goal.id)} />
                                }
                                <DeleteTwoTone onClick={() => deleteGoal(goal.id)} />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default function GoalList(props) {
    return (
        <>
            <Connect
                query={graphqlOperation(queries.listGoals)}
                subscription={graphqlOperation(subscriptions.onCreateGoal)}
                onSubscriptionMsg={(prev, { onCreateGoal }) => {
                    console.log({prev})
                    prev.listGoals.items.push(onCreateGoal)
                    return prev; 
                }}
            >
                {({ data: { listGoals }, loading, errors }) => {
                    if (errors.length > 0) {return (<h3>Error</h3>)};
                    if (loading || !listGoals) {return (<h3>Loading...</h3>)};
                    return (<GoalListView goals={listGoals.items} /> );
                }}
            </Connect>
            <AddGoal />
        </>
    )
}
