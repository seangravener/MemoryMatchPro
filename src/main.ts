import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Path to your AppModule

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
