export interface TaskData {
  config: {
    persist: boolean;
    task: Task;
  };
}

export interface TasksData {
  config: {
    tasks: Task[];
  };
}

interface Task {
  id?: string;
  name?: string;
}
