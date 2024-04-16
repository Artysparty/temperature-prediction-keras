import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PredictionService } from './prediction-service.service';
import { Observable } from 'rxjs';
import {
  HttpClientModule,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxDropzoneModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [PredictionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  preview = '';

  constructor(
    private uploadService: PredictionService,
    private _snackBar: MatSnackBar
  ) {}

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      const pattern = /[\[\]'\"]/g;
      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe((res) => {
          this.message = res.message.replace(pattern, "");
          if (this.message.length) {
            this._snackBar.open(this.message, 'OK!', {
              duration: 10000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            });
          }
        })
      }

      this.selectedFiles = undefined;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
