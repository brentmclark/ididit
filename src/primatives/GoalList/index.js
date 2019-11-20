import React from 'react'
import { API, graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react'

import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import * as mutations from '../../graphql/mutations';

import AddGoal from '../../primatives/AddGoal'


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
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Objective</th>
                    <th colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    goals.map(goal => {
                        const contentIsEditable = editableGoalId === goal.id
                        return (
                            <tr key={goal.id}>
                                <td contentEditable={contentIsEditable}>{goal.name}</td>
                                <td contentEditable={contentIsEditable}>{goal.objective}</td>
                                <td onClick={() => deleteGoal(goal.id)}>delete</td>
                                {
                                    contentIsEditable 
                                    ? <td onClick={() => setEditableGoalId(null)}>save</td>
                                    : <td onClick={() => setEditableGoalId(goal.id)}>edit</td>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
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
