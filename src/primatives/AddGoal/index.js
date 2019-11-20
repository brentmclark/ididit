import React from 'react'
import { Connect } from 'aws-amplify-react'
import { graphqlOperation }  from "aws-amplify";
import * as mutations from '../../graphql/mutations'

export default function AddGoal(props) {
    return (
        <Connect mutation={graphqlOperation(mutations.createGoal)}>
          {({mutation}) => (
            <AddGoalView createGoal={mutation} />
          )}
        </Connect>
    )
}

function AddGoalView(props) {
    async function handleSubmit(event) {
        event.preventDefault()
        const input = {
            name: event.target.elements[0].value,
            objective: event.target.elements[1].value,
        }
        try {
            await props.createGoal({input})
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Goal</h3>
            <div>
                <label htmlFor="goalName">Name</label>
                <input type="text" name="goalName" id="goalName" />
            </div>
            <div>
                <label htmlFor="goalValue">Objective</label>
                <input type="number" name="goalValue" id="goalValue" />
            </div>
            <button type="submit">Add Goal</button>
        </form>
    )
}