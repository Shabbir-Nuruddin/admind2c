import { collection, onSnapshot, query, addDoc, updateDoc, doc, serverTimestamp, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

// --- TASKS ---
export type Task = {
  id: string;
  title: string;
  assignee: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt?: any;
};

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

export async function addTask(taskData: Omit<Task, "id" | "createdAt">) {
  return await addDoc(collection(db, "tasks"), {
    ...taskData,
    createdAt: serverTimestamp()
  });
}

export async function updateTask(id: string, data: Partial<Task>) {
  const taskRef = doc(db, "tasks", id);
  return await updateDoc(taskRef, data);
}

// --- DESIGNS ---
export type Design = {
  id: string;
  title: string;
  src: string;
  status: "Draft" | "In Review" | "Approved";
  createdAt?: any;
};

export function subscribeToDesigns(callback: (designs: Design[]) => void) {
  const q = query(collection(db, "designs"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const designs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Design[];
    callback(designs);
  });
}

export async function uploadDesign(file: File, title: string) {
  // 1. Upload image to Firebase Storage
  const fileExtension = file.name.split('.').pop();
  const storageRef = ref(storage, `designs/${Date.now()}.${fileExtension}`);
  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  // 2. Save metadata to Firestore
  return await addDoc(collection(db, "designs"), {
    title,
    src: downloadUrl,
    status: "Draft",
    createdAt: serverTimestamp()
  });
}
