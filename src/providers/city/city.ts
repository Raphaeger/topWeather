import { Storage } from '@ionic/storage';
import { OpenWeatherCity } from './../../models/OpenWeatherCity.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CityProvider {

  public getAll(): Promise<OpenWeatherCity[]> {

    return null

  }

  constructor(public storage: Storage) { }

  getByCode(code: number): Promise<OpenWeatherCity> {
    return this.storage.get(`cities.${code}`);
  }

  save(id: number, name: string): Promise<OpenWeatherCity> {//Pode ser utilizado tanto para salvar uma cidade nova quanto atualizar.
    return this.storage.set(`cities.${id}`, name);
  }

  listCityById(id: number): Promise<string> {
    return new Promise(res => {
      this.storage.get(`cities.${id}`)
      .then((cidade) => {
        res(cidade);
      })
      .catch((err) => {
        res(err);
      });
    });
  }

  listCities(): Promise<string[]> {
    var cidades = [];
    return new Promise(res => {
      this.storage.forEach( (cidade) => {
        cidades.push(cidade);
      })
      .then(() => {
        res(cidades);
      })
      .catch((err) => {
        res(err);
      });
    });
  }

  delete(code: number): Promise<boolean> {//Remoção de uma cidade da lista.
    return this.storage.remove(`cities.${code}`).then(() => true);
  }
}