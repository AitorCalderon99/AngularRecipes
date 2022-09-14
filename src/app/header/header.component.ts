import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import * as fromApp from '../store/app.reducer';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  collapsed = true;

  authSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router,private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').pipe(map(authState => {return authState.user})).subscribe(user => {
      this.userIsAuthenticated = !!user;
    });
  }


  onSaveData() {
    this.store.dispatch(new RecipeActions.storeRecipes());
  }

  onFetchData() {
    //this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.fetchRecipes());
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/user']);
  }
}
