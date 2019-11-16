/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGoal = `query GetGoal($id: ID!) {
  getGoal(id: $id) {
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
export const listGoals = `query ListGoals(
  $filter: ModelGoalFilterInput
  $limit: Int
  $nextToken: String
) {
  listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      tasks {
        nextToken
      }
      objective
    }
    nextToken
  }
}
`;
export const getTask = `query GetTask($id: ID!) {
  getTask(id: $id) {
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
export const listTasks = `query ListTasks(
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      goal {
        id
        name
        objective
      }
      value
    }
    nextToken
  }
}
`;
