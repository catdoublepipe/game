import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PongGameComponent } from './pong-game/component/pong-game.component';

const routes: Routes = [
  { path: 'pong', component: PongGameComponent },
  { path: '', pathMatch: 'full', redirectTo: 'pong' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
