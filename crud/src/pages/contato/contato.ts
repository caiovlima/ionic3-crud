import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/*Importamos o provider de contatos, e o formbuilder
 */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoProvider } from './../../providers/contato/contato';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {
  title: string;
  form: FormGroup;
  contact: any;
  // no meu construtor inicio esses caras aqui

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private provider: ContatoProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.contact = this.navParams.data.contact || {};
      this.createForm();
      this.setupPageTitle();

  }

  private setupPageTitle(){
    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo Contato';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      name: [this.contact.name, Validators.required],
      tel: [this.contact.tel, Validators.required],
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.provider.save(this.form.value)
      .then(() => {
        this.toast.create({message: 'Contato salvo com sucesso.', duration: 3000}).present();
        this.navCtrl.pop();
      })
      .catch((e)=> {
        this.toast.create({message: 'Erro ao salvar contato.', duration: 3000}).present();
        console.error(e);
      });
    }
  }

}
