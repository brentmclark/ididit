import React from 'react'
import { Connect } from 'aws-amplify-react'
import { graphqlOperation }  from "aws-amplify";
import * as mutations from '../../graphql/mutations'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons'


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3,2),
        margin: theme.spacing(6, 0)
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: theme.spacing(3, 0, 0),
      justifyContent: 'center'
    },
    textField: {
      margin: theme.spacing(0, 1),
      width: 200,
    },
  }));

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
    const classes = useStyles()

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
        <Paper className={classes.paper}>

        <form onSubmit={handleSubmit}>
                <Typography variant="h3">Add Goal</Typography>
                <div className={classes.container}>
                    <TextField
                        id="goal-name"
                        name="goal-name"
                        label="Name"
                        margin="normal"
                        variant="filled"
                        color="primary"
                        className={classes.textField}
                        />
                    <TextField
                        id="goal-value"
                        name="goal-value"
                        label="Objective"
                        margin="normal"
                        variant="filled"
                        color="primary"
                        type="number"
                        className={classes.textField}
                        />
                    <Button type="submit" variant="contained" color="primary"><Add /></Button>
                </div>
        </form>
        </Paper>
    )
}