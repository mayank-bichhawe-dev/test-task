'use client'
import { Task } from "@/components/TaskForm";
const localStorageKeyName = {
    tasks: "tasks"
}

export const getLocalStorageData=()=>{
    const data = localStorage.getItem(localStorageKeyName.tasks)
    if(data){
        return JSON.parse(data);
    }
    return [];
}

export const setLocalStorageData=(task: Task)=>{
    const getLocalData = getLocalStorageData();
    task.id = new Date().getTime()*2*1;
    task.lastUpdatedAt = Date.now();
    const updatedData = [...getLocalData, task];
    localStorage.setItem(localStorageKeyName.tasks, JSON.stringify(updatedData));
}

export const updateLocalStorageData=(task: Task)=>{
    const getLocalData = getLocalStorageData();
    task.lastUpdatedAt = Date.now();
    const removeOldTask = getLocalData.filter((val: Task)=> val.id !== task.id)
    const updatedData = [...removeOldTask, task];
    localStorage.setItem(localStorageKeyName.tasks, JSON.stringify(updatedData));
}

export const handleLocalStorageData=(task: Task)=>{
    if(task.id){
        updateLocalStorageData(task)
    }else{
        setLocalStorageData(task)
    }
}