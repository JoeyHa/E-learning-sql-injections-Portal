import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { QuizComponent} from './main/quiz/quiz.component'
import { ResourcesComponent } from './main/resources/resources.component';
import { AuthGuard } from './auth/guard';
import { QuestionsComponent } from './main/questions/questions.component';
import { ResultsComponent } from './main/results/results.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard] },
  { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
