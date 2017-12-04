import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ContatoProvider } from './../../providers/contato/contato';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: Observable<any>;


  constructor(
    private provider: ContatoProvider,
    private toast: ToastController,
    public navCtrl: NavController) {
      this.contacts = this.provider.getAll();

  }

  novoContato(){
    this.navCtrl.push('ContatoPage');
  }

  editarContato(contact: any){
    this.navCtrl.push('ContatoPage', {contact: contact});
  }

  removeContato(key: string){
    this.provider.remove(key)
    .then(()=>{
      this.toast.create({message: 'Contato removido com sucesso.', duration: 3000}).present();

    })
    .catch((e)=>{
      this.toast.create({message: 'Erro ao remover contato.', duration: 3000}).present();
    });

  }
}
