import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { WineComponent } from './wine/wine.component';
import { WineDataService } from './wine-data.service';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

import  {RouterModule,Routes} from '@angular/router';

const appRoutes:Routes=[
  {path:'portfolio', component:PortfolioComponent},
  {path:'', component:WineComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    WineComponent,
    LoginComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ WineDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
