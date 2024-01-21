import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
// import { GreetingComponentComponent } from './greeting-component/greeting-component.component';
import { ActivitiesComponent } from './activities/activities.component';
// import { ActivitiesFormComponent } from "./activities-form/activities-form.component";
// import { ActivitiesFormReactiveComponent } from "./activities-form-reactive/activities-form-reactive.component";
import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';
import { MonitorsComponent } from './monitors/monitors.component';
@Component({
    selector: 'diw-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [MonitorsComponent,FooterTabsComponent,HeaderComponent,RouterOutlet, RouterLink, RouterLinkActive, CommonModule, RouterOutlet, ActivitiesComponent]
})
export class AppComponent {
  title: string = 'angular-GymApp-JuanHidalgo';
  selectedOption: string = 'activity';

  constructor(private router: Router) {} // Inyecta el servicio Router aquí
  

  updateSelectedOption(option: string): void {
    this.selectedOption = option;
    if (option === 'activity') {
      this.router.navigate(['/actividades']);
    } else if (option === 'monitors') {
      this.router.navigate(['/monitors']);
    }
  }
}
