import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ContatoProvider {

  private PATH = 'contacts/';

  constructor(private db: AngularFireDatabase) {

  }

  // métodos do crud: buscar, ler, adicionar, excluir

  // buscar todos
  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes =>{
      // MAP: basicamente é a maneira de como 
      // você quer mapear o objeto, do jeito que você quer acessar ele externamente
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    })

  }

  // buscar específico
  get(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => {
      return {key: c.key, ...c.payload.val()};
    })

  }

  // save possui o update e o create dentro dele, porém podemos desmembrar esse método
  save(contact: any){
    return new Promise((resolve, reject) =>{
      // se o contato tiver uma key, ele vai fazer update, se não tiver, vai fazer a inserção
      if(contact.key){
        this.db.list(this.PATH)
        .update(contact.key, {name: contact.name, tel: contact.tel})
        .then(() => resolve())
        .catch((e) => reject(e));

      } else{
        this.db.list(this.PATH)
        .push({name: contact.name, tel: contact.tel})
        .then(() => resolve());

      }

    });

  }

  remove(key: string){
    // passando o key pro remove, eu deleto um específico, caso queira deletar todos, apenas não passar nada
    return this.db.list(this.PATH).remove(key);

  }
}
