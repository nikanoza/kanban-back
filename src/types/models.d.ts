export interface BoardType {
  title: string;
  columns: string[];
  id: string;
}

export interface ColumnType {
  title: string;
  tasks: string[];
  id: string;
}

export interface TaskType {
  title: string;
  description: string;
  subtasks: string[];
  id: string;
}

export interface SubtaskType {
  title: string;
  active: boolean;
  id: string;
}
