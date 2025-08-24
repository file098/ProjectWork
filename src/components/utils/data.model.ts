// Season definitions for agricultural data
export enum Stagione {
  PRIMAVERA = 'primavera',
  ESTATE = 'estate',
  AUTUNNO = 'autunno',
  INVERNO = 'inverno',
}

export enum TipoColtivazione {
  CEREALI = 'cereali',
  ORTAGGI = 'ortaggi',
  FRUTTA = 'frutta',
}

// Main data structure for farm operations
export interface DatiAzienda {
  id: string
  data: Date
  azienda: string

  // Environmental metrics - key indicators for crop success
  temperatura: number // daily average temp in Celsius
  umidita: number // humidity percentage
  precipitazioni: number // rainfall in mm
  oreSole: number // sunshine hours

  // Production data - what we're actually growing
  quantitaRaccolto: number // harvest quantity in kg
  superficieColtivata: number // cultivated area in hectares
  qualitaProdotto: number // product quality rating (1-10)
  tipoColtivazione: TipoColtivazione

  // Financial tracking
  costiProduzione: number // production costs in euros
  ricavi: number // revenue in euros
  margineProfitto: number // profit margin percentage

  // Resource management
  consumoAcqua: number // water consumption in liters
  consumoCarburante: number // fuel consumption in liters
  oreLavoro: number // labor hours

  // Performance indicators
  efficienzaProduttiva: number // productivity efficiency (kg/hectare)
  sostenibilita: number // sustainability index (1-10)

  stagione: Stagione
}

export type DatasetAzienda = DatiAzienda[]

// Stats for analyzing periods of time
export interface StatistichePeriodo {
  dataInizio: Date
  dataFine: Date
  mediaTemperatura: number
  totalePrecipitazioni: number
  produzioneTotale: number
  ricaviTotali: number
}
