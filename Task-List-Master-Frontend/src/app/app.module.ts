import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule, MatSelectModule,MatAutocompleteModule,MatButtonModule,
MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './service/task.service';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatButtonModule,
    BrowserModule,
    MatPaginatorModule
  ],
  providers: [TaskService],
  entryComponents:[TaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
