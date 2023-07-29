import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddNewClientComponent } from './pages/add-new-client/add-new-client.component';
import { FullDetailsComponent } from './pages/full-details/full-details.component';
import { AuthGuardService } from './services/auth-guard.service';
AuthGuardService

const routes: Routes = [
  {path: '', 
  component: DashboardComponent,
  canActivate:[AuthGuardService]
  },
  {path: 'login', 
  component: LoginComponent
  },
  {path: 'register', 
  component: RegisterComponent
  },
  {path: 'add-new-client', 
  component: AddNewClientComponent,
  canActivate:[AuthGuardService]
  },
  {path: 'full-details/:id', 
  component: FullDetailsComponent,
  canActivate:[AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
