export interface Task {
  id: number;
  name: string;
  contributorName: string;
  visibility: boolean;
  status: "published" | "draft";
  lastUpdatedAt: string | number;
  logo: string;
}

export interface TaskError {
  name: boolean;
  contributorName: boolean;
  visibility: boolean;
  status: boolean;
  lastUpdatedAt: boolean;
  logo: boolean;
}

export interface TaskFormProps {
  id?: number;
}
