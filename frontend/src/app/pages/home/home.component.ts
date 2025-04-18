import { Component, ChangeDetectorRef } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { FormularioComponent } from '../../layout/formulario/formulario.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuComponent, CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  isLoading : boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.isLoading = false;
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    this.cdr.detectChanges(); 

    emailjs
      .sendForm('service_3nlw88s', 'template_jd3jtkp', e.target as HTMLFormElement, {
        publicKey: '9HFwqoPfqWMMnzdk8',
      })
      .then(
        () => {
          this.isLoading = false;      
          this.cdr.detectChanges();
          window.alert('Mensagem enviada com sucesso! 🎉');
          console.log('SUCCESS!');
          window.location.href = 'https://playout.fluxo-digital.com/';
        },
        (error) => {
          this.isLoading = false;
          this.cdr.detectChanges();
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }

}