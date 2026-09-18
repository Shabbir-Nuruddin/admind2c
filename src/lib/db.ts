import { collection, onSnapshot, query, addDoc, updateDoc, doc, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export type Task = {
  id: string;
  title: string;
  assignee: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt?: any;
};

// Subscribe to tasks
export function subscribeToTasks(callback: (tasks: Task[]) => void) {
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];
    callback(tasks);
  });
}

// Add a new task
export async function addTask(taskData: Omit<Task, "id" | "createdAt">) {
  return await addDoc(collection(db, "tasks"), {
    ...taskData,
    createdAt: serverTimestamp()
  });
}

// Update a task
export async function updateTask(id: string, data: Partial<Task>) {
  const taskRef = doc(db, "tasks", id);
  return await updateDoc(taskRef, data);
}
