/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGoal = `subscription OnCreateGoal {
  onCreateGoal {
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
export const onUpdateGoal = `subscription OnUpdateGoal {
  onUpdateGoal {
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
export const onDeleteGoal = `subscription OnDeleteGoal {
  onDeleteGoal {
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
export const onCreateTask = `subscription OnCreateTask {
  onCreateTask {
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
export const onUpdateTask = `subscription OnUpdateTask {
  onUpdateTask {
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
export const onDeleteTask = `subscription OnDeleteTask {
  onDeleteTask {
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
