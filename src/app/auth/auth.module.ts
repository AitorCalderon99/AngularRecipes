import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    FormsModule,
    SharedModule,
    CommonModule
  ]
})
export class AuthModule {

}
