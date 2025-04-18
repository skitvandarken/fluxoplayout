import { Component, ChangeDetectorRef } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { FormularioComponent } from '../../layout/formulario/formulario.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
          
          Swal.fire({
            title: 'Sucesso!',
            text: 'Mensagem enviada com sucesso! 🎉',
            background: '#4CAF50', // verde
            color: '#ffffff',
            icon: 'success',
            confirmButtonColor: '#FF0000',
            confirmButtonText: 'VOLTAR AO INÍCIO',
          }).then(() => {
            window.location.href = 'https://playout.fluxo-digital.com/';
          });          

          console.log('SUCCESS!');
        },
        (error) => {
          this.isLoading = false;
          this.cdr.detectChanges();
          Swal.fire({
            title: 'Sucesso!',
            text: 'Mensagem enviada com sucesso! 🎉',
            background: '#FF0000', // vermelho
            color: '#ffffff',
            icon: 'success',
            confirmButtonColor: '#4CAF50',
            confirmButtonText: 'VOLTAR AO INÍCIO',
          }).then(() => {
            window.location.href = 'https://playout.fluxo-digital.com/';
          });
        },
      );
  }

}