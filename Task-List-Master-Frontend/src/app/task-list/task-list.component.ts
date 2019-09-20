import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  isPopupOpened = true;

  dataSource= new MatTableDataSource<Task>(this._taskService._taskList);
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;

  constructor(private dialog?: MatDialog,
    private _taskService?: TaskService) { }

  ngOnInit() {
    this.refreshTaskList();

  this.dataSource.paginator=this.paginator;
  }

  refreshTaskList() {
    this._taskService.getAllTasks().subscribe(res =>{
      this._taskService._taskList = res as Task[];
    });
  }

  get TaskList() {
    return this._taskService.getAllTasks();
  }

  addTask() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(TaskComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
    this.refreshTaskList();
  }

  deleteTask(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this._taskService.deleteTask(_id).subscribe((res) => {
        this.refreshTaskList();
       });
    }
  }

}
