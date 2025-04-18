import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import emailjs, {type EmailJSResponseStatus} from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [TranslatePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {


  useLanguage(language: string): void {
    this.translate.use(language);
}

contactForm: FormGroup;
constructor(private router: Router,private translate: TranslateService, private fb: FormBuilder) {

  this.contactForm = this.fb.group({
    tipo: ['', Validators.required],
    fullName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    message: ['', Validators.required, Validators.minLength(10)],
    angolaCables : ['', Validators.required],

  });



}

submitForm(event: Event) {
  event.preventDefault();

  this.contactForm.markAllAsTouched();


  if (this.contactForm.invalid) {
    window.alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const formData = this.contactForm.value;

  emailjs.send('service_3nlw88s', 'template_jd3jtkp', formData, {
    publicKey: '9HFwqoPfqWMMnzdk8'
  })
  .then(() => {
    window.alert('Mensagem enviada com sucesso! 🎉');
    window.location.href = 'https://playout.fluxo-digital.com/';
    // Limpa o formulário após o envio
    this.contactForm.reset();
  })
  .catch((error: EmailJSResponseStatus) => {
    console.error('Falhou...', error.text);
    window.alert('Não foi possível enviar sua candidatura.');
  });
}

}
