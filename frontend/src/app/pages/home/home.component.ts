import { Component } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuComponent, 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {


  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm('service_3nlw88s', 'template_jd3jtkp', e.target as HTMLFormElement, {
        publicKey: '9HFwqoPfqWMMnzdk8',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }

}