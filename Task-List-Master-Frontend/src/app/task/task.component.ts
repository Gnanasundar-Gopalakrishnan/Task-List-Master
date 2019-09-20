import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public _taskForm: FormGroup;
  Task = new FormControl();

  
  departmentNames: string[] = ['Ground','Cargo','Catering','Engineering','Flight operations','Inflight','Medicals','Security'];
  serviceTypes: string[] = ['Ramp','Customer Service','Cabin Appearence','Cargo','Catering','Customer Service','Engineering','Flight Operations','Inflight','Medicals','Security'];
  skills:string[]=['AOCC','Baggage Handling','Baggage Services','BMA','Boarding','Cabin cleaning','Cargo','Catering','Check-in','CLCU','Engineering','Flight Operations','GSV Movement','GSV/GSE operator','Inflight','Loading/Unloading','Medicals','Ramp Team','Security','Ticketing','Toilet Service','Water Service','Cabin Cleaning'];
  roles:string[]=['Staff','Loader','Duty Manager','Supervisor','Staff/Supervisor','Cleaners','Driver','Supervisor/DM','DM/Supervisor/Staff','AMT','AME','Captian','Driver/Loader','Cabin Supervisor','Cabin Crew','ABIC','Crew'];
  // types: string[] = ['Test 1','Test 2'];


  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;
  filteredOptions4: Observable<string[]>;

  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskComponent>,
    private _taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {

    this._taskForm = this._formBuilder.group({
      _id: [this.data._id],
      taskID:[this.data.taskID,[Validators.required]],
      taskList: [this.data.taskList, [Validators.required]],
      departmentName: [this.data.departmentName, [Validators.required]],
      serviceType: [this.data.serviceType, [Validators.required]],
      skill: [this.data.skill, [Validators.required]],
      role: [this.data.role, [Validators.required]]
    });

    // this._taskForm=new FormGroup({
    //   taskID:new FormControl('',Validators.compose(
    //     [Validators.required,
    //     Validators.pattern('^[T0-9_.+-]')]
    //   ))
    // })

    this.filteredOptions=this.Task.valueChanges
    .pipe(
      startWith(''),
      map(value=>this._filter(value))
    );

    this.filteredOptions2=this.Task.valueChanges
    .pipe(
      startWith(''),
      map(value=>this._filter2(value))
    );
    
    this.filteredOptions3=this.Task.valueChanges
    .pipe(
      startWith(''),
      map(value=>this._filter3(value))
    );

    this.filteredOptions4=this.Task.valueChanges
    .pipe(
      startWith(''),
      map(value=>this._filter4(value))
    );

    this.refreshTaskList();
  }

  private _filter(value: string): string[]{
    const filterValue=value.toLowerCase();
    return this.departmentNames.filter(departmentName=>departmentName.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[]{
    const filterValue=value.toLowerCase();
    return this.serviceTypes.filter(serviceType=>serviceType.toLowerCase().includes(filterValue));
  }

  private _filter3(value: string): string[]{
    const filterValue=value.toLowerCase();
    return this.skills.filter(skill=>skill.toLowerCase().includes(filterValue));
  }

  
  private _filter4(value: string): string[]{
    const filterValue=value.toLowerCase();
    return this.roles.filter(role=>role.toLowerCase().includes(filterValue));
  }


  onSubmit(form: NgForm) {
    this._taskService.addTask(form.value).subscribe((res) => {
      this._taskForm = this._formBuilder.group({
        _id: [this.data._id],
        taskID:[this.data.taskID,[Validators.required]],
        taskList: [this.data.taskList, [Validators.required]],
        departmentName: [this.data.departmentName, [Validators.required]],
        serviceType: [this.data.serviceType, [Validators.required]],
        skill: [this.data.skill, [Validators.required]],
        role: [this.data.role, [Validators.required]]
      });
    });
    this.dialogRef.close();
    this.refreshTaskList();

  }
  refreshTaskList() {
    this._taskService.getAllTasks().subscribe(res => {
      this._taskService._taskList = res as Task[];
    });
  }
}
