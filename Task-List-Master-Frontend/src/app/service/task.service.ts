import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {


  _taskList: Task[] ;
  selectedAircraft : Task;

  readonly baseURL ='http://localhost:3000/task';

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    return this.http.post(this.baseURL, task);
  }

  getAllTasks() {
    return this.http.get(this.baseURL);
  }

  editTask(task: Task) {
    return this.http.patch(this.baseURL + `/${task._id}`, task);
  }


  deleteTask(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


}