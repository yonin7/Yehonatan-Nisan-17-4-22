export interface degrees {
  Unit: string;
  UnitType: number;
  Value: number;
}
export interface currentTemperature {
  Metric: degrees;
  Imperial: degrees;
}
export interface ICurrentWeather {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  Temperature: currentTemperature;
  WeatherIcon: number;
  WeatherText: string;
}
interface weekTemperature {
  Minimum: degrees;
  Maximum: degrees;
}

export interface IWeekDay {
  Date: string;
  Day: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
  EpochDate: number;
  Link: string;
  MobileLink: string;
  Night: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
  Sources: string[];
  Temperature: weekTemperature;
}

export interface ICity {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

export interface IFavoriteCity {
  Key: string;
  LocalizedName: string;
  weather: string;
  temperature: number;
}
