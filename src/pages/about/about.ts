import { Storage } from '@ionic/storage';
import { CityProvider } from './../../providers/city/city';
import { SeilaProvider } from './../../providers/seila/seila';
import { OpenWeatherCity } from '../../models/OpenWeatherCity.model';
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  cidades = [];

  constructor(public navCtrl: NavController, 
    public http: Http, 
    public cityDAO: CityProvider,
    public cityProvider: SeilaProvider, 
    public alertCtrl: AlertController,
    public storage: Storage
  ) {

  }

  ionViewWillEnter() {
    this.cidades = [];
    this.listCity();
  }
  
  loadCidade(city: string) {
    this.cityProvider.loadCidade(city)
      .then(res => {
        this.cidades.push(res);
      })
      .catch(err => {
        this.showAlert("Erro ao carregar as cidades.");
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

  listCity() {
    this.cityDAO.listCities()
      .then((dados) => {
        for (let city of dados) {
          this.loadCidade(city)
        }
      })
    }
  
    removeCity(city: string, id: number) {
      let alert = this.alertCtrl.create({
        title: "Remover Cidade?",
        subTitle: `Deseja remover a cidade ${city}`,
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.cityDAO.delete(id, city)
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

  