import { Schema } from "mongoose";

export interface BoardType {
  title: string;
  columns: Schema.Types.ObjectId[];
  id: string;
}

export interface ColumnType {
  title: string;
  tasks: Schema.Types.ObjectId[];
  id: string;
}

export interface TaskType {
  title: string;
  description: string;
  subtasks: Schema.Types.ObjectId[];
  id: string;
}

export interface SubtaskType {
  title: string;
  active: boolean;
  id: string;
}
