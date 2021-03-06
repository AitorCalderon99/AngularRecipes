import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  collapsed = true;

  authSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(user => {
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
    this.authService.logout();
    this.router.navigate(['/user']);
  }
}
