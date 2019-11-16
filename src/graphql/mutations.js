/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGoal = `mutation CreateGoal($input: CreateGoalInput!) {
  createGoal(input: $input) {
    id
    name
    tasks {
      items {
        id
        title
        value
      }
      nextToken
    }
    objective
  }
}
`;
export const updateGoal = `mutation UpdateGoal($input: UpdateGoalInput!) {
  updateGoal(input: $input) {
    id
    name
    tasks {
      items {
        id
        title
        value
      }
      nextToken
    }
    objective
  }
}
`;
export const deleteGoal = `mutation DeleteGoal($input: DeleteGoalInput!) {
  deleteGoal(input: $input) {
    id
    name
    tasks {
      items {
        id
        title
        value
      }
      nextToken
    }
    objective
  }
}
`;
export const createTask = `mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    title
    goal {
      id
      name
      tasks {
        nextToken
      }
      objective
    }
    value
  }
}
`;
export const updateTask = `mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
    title
    goal {
      id
      name
      tasks {
        nextToken
      }
      objective
    }
    value
  }
}
`;
export const deleteTask = `mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    id
    title
    goal {
      id
      name
      tasks {
        nextToken
      }
      objective
    }
    value
  }
}
`;
