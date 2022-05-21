import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-router.module';
import {AuthComponent} from './page/auth.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule {
}
