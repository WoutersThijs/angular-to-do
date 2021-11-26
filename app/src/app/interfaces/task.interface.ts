export interface Task {
  id: number;
  list_id: number;
  name: string;
  description: String;
  deadline: Date;
  complete: boolean;
}
