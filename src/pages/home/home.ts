import { Storage } from '@ionic/storage';
import { CityProvider } from './../../providers/city/city';
import { SeilaProvider } from './../../providers/seila/seila';
import { OpenWeatherCity } from '../../models/OpenWeatherCity.model';
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  now: string;
  items = [];
  city: string;
  cidades = [];

  constructor(public navCtrl: NavController, 
    public http: Http, 
    public cityDAO: CityProvider,
    public cityProvider: SeilaProvider, 
    public alertCtrl: AlertController,
    public storage: Storage
    )
    {
    var timeWindow: number = new Date().getHours();

    if (timeWindow < 6 || timeWindow > 18) {
      this.now = "night";
    } else {
      this.now = "day";
    }
  }

  loadCidade() {
    this.cityProvider.loadCidade(this.city)
    .then(res => {
      this.cidades.push(res);
    })
    .catch(err => {
      this.showAlert("Cidade não encontrada");
    })
  }
  
  getCity() {
    this.cidades = [];
    this.cityProvider.loadCidade(this.city)
    .then(response => {
      this.cidades.push(response);
    })
    .catch(error => {
      //Fazer depois (Alerta);
    })
  }
  
  showAlert(mensagem: string) {
    let alert = this.alertCtrl.create({
      title: mensagem,
      buttons: [
        "OK"
      ]
    });
    alert.present();
  }

  addCity(city: string, id: number) {
    let alert = this.alertCtrl.create({
      title: "Salvar Cidade",
      subTitle: `Deseja salvar a cidade ${city}`,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.cityDAO.save(id, city)
            .then(res => {
              this.showAlert("Feito!");
            })
            .catch(error => {
              this.showAlert("Erro");
            })
            ;
          }
        },
        {
          text: "Não",
          role: "cancel"
        }
      ]
    });
    alert.present();
  }
}