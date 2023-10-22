import { AppModule } from './app/_bootstrap/app.module'
import './polyfills'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    if (window['ngRef']) {
      window['ngRef'].destroy()
    }
    window['ngRef'] = ref
  })
  .catch((err) => console.error(err))
