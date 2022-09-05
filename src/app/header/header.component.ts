import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import * as fromApp from '../store/app.reducer';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  collapsed = true;

  authSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService,private authService: AuthService, private router: Router,private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').pipe(map(authState => {return authState.user})).subscribe(user => {
      this.userIsAuthenticated = !!user;
    });
  }


  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/user']);
  }
}
