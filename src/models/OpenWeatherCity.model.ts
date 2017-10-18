import { Component, Injectable } from '@angular/core';

@Injectable()
export class OpenWeatherCity {
  code: number;
  name: string;
  lat: string;
  lon: string;
  weatherCondition: string;
  weatherDeion: string;
  weatherIconName: string;
  weatherIcon: string;
  temp: string;
  pressure: string;
  humidity: string;
  visibility: string;
  windSpd: string;
  windDeg: string;
  windDir: string;
  clouds: string;
  sunrise: string;
  sunset: string;
  weatherDescription: string;
  log: string;

  constructor() {}

}