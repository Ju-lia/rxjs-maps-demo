import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  githubUrl = 'https://github.com/ammarnajjar/rxjs-maps-demo';
  footNote = 'RxJS Deep Dive - Maps operations';
}
