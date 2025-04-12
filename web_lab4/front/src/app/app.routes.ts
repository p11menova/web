import { Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'graph', component: GraphComponent }

];
