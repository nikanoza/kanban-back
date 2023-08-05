export interface NewBoardType {
  title: string;
  columns: string[];
}

export interface UpdateBoardType {
  title: string;
  id: string;
}

export interface NewTask {
  title: string;
  description: string;
  columnId: string;
  subtasks: string[];
}
