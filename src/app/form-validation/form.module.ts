import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidationComponent } from './form-validation.component';
import { Routes, RouterModule } from '@angular/router';


const route: Routes = [
    { path: '', component: FormValidationComponent },
]

@NgModule({
    declarations: [
        FormValidationComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(route)
    ],
    exports: [
        FormValidationComponent
    ]
})

export class ValidationsModule { }