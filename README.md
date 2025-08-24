# Agricultural Dashboard Project

## Overview

This is a modern agricultural management dashboard built with Vue.js, providing real-time insights into farm operations, environmental conditions, and financial performance. The dashboard simulates agricultural data and presents it through an intuitive interface with interactive charts and metrics.

## Features

### 🌱 Environmental Monitoring

- Real-time temperature, humidity, and weather tracking
- Soil condition monitoring (moisture, temperature, pH levels)
- Climate data visualization with interactive charts

### 📊 Production Management

- Harvest quantity and quality tracking
- Cultivated area management
- Crop type monitoring (cereals, vegetables, fruits)
- Resource usage analytics (water, fuel, labor hours)

### 💰 Financial Performance

- Revenue and cost tracking
- Profit margin analysis
- Production efficiency metrics
- Sustainability scoring

### 🎛️ Dashboard Features

- Three main views: Environmental Data, Production, Financial Performance
- Responsive design for desktop and mobile
- Real-time data simulation engine
- Customizable time periods (7, 30, 90 days)

## Technology Stack

- **Frontend**: Vue.js 3 with Composition API
- **Styling**: SCSS with custom design system
- **Charts**: Chart.js with vue-chartjs
- **Icons**: Iconoir icon library
- **Build Tool**: Vite
- **Language**: TypeScript for type safety

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Header, etc.)
│   ├── data/            # Data visualization components
│   │   ├── Climate.vue  # Environmental data dashboard
│   │   ├── Production.vue # Production metrics
│   │   └── Performance.vue # Financial performance
│   ├── ui/              # Reusable UI components
│   └── utils/           # Data models and utilities
├── composables/         # Vue composables
│   └── useEngine.ts     # Data simulation engine
├── assets/              # Styles and themes
├── views/               # Main page views
└── router/              # Vue Router configuration
```

## Data Model

The application uses a comprehensive data model covering:

- **Environmental Metrics**: Temperature, humidity, rainfall, sunshine hours
- **Production Data**: Harvest quantity, cultivated area, product quality, crop types
- **Financial Tracking**: Production costs, revenue, profit margins
- **Resource Management**: Water, fuel, and labor consumption
- **Performance Indicators**: Productivity efficiency and sustainability scores

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Data Simulation

The dashboard includes a sophisticated simulation engine that generates realistic agricultural data based on:

- Seasonal variations
- Crop-specific growth patterns
- Weather impact on production
- Economic factors and market conditions
- Resource consumption patterns

The simulation automatically updates every 3 seconds to demonstrate real-time monitoring capabilities.

## Design Philosophy

This dashboard follows modern UX principles:

- **Clean Interface**: Minimalist design focusing on essential information
- **Responsive Layout**: Adapts to different screen sizes
- **Accessible**: Proper color contrast and semantic HTML
- **Performance**: Optimized for fast loading and smooth interactions

## Future Enhancements

- Integration with real IoT sensors
- Historical data analysis
- Weather forecast integration
- Multi-farm management
- Advanced reporting features
- Mobile app companion

# Assistant Chat Export

### Assistant message 1

Per costruire un **motore di simulazione credibile e utile** per un dashboard del settore primario, devi pensare alle variabili come a _flussi di input_ (ambientali) e _output operativi_ (produttivi/gestionali). Ti consiglio di strutturarle in 4 blocchi: **ambiente**, **produzione**, **risorse/consumi**, **indicatori economici**.

#### 🌦️ Variabili Ambientali

- Temperatura (min/max/media)
- Umidità relativa
- Precipitazioni
- Vento
- Radiazione solare
- Umidità del suolo
- Livello nutrienti nel suolo (N-P-K)
- Eventi anomali (grandine, gelata, siccità)

#### 🌱 Variabili di Produzione

- Tipo coltura
- Stadio di crescita
- Giorni dall’inizio del ciclo
- Quantità prodotta
- Tasso di crescita giornaliero
- Tempo medio di maturazione

#### 🚰 Variabili di Consumo / Risorse

- Uso acqua
- Uso fertilizzanti (N/P/K)
- Ore di lavoro
- Utilizzo macchinari
- Costo carburante

#### 💶 Variabili Economiche

- Ricavi stimati
- Costo operativo totale
- Margine lordo
- Efficienza del raccolto

> input ambientali → modello di crescita → output produttivi → costi → margine/performance

Se vuoi, nel prossimo messaggio ti posso **proporre già la struttura base dell’oggetto JavaScript** del simulatore. Ti interessa?

---

### Assistant message 2

Perfetto — ti preparo subito una **struttura base (in TypeScript)** per il motore di simulazione, già suddivisa per sezioni logiche.

```ts
// =======================================================
// Tipi per le variabili ambientali
// =======================================================
type EnvironmentalData = {
  temperatureMin: number // °C
  temperatureMax: number // °C
  temperatureAvg: number // °C
  humidity: number // %
  precipitation: number // mm
  windSpeed: number // km/h
  solarRadiation: number // W/m2
  soilMoisture: number // %
  nutrients: {
    nitrogen: number
    phosphorus: number
    potassium: number
  }
  abnormalEvent: 'none' | 'frost' | 'hail' | 'drought'
}

// =======================================================
// Tipi per le variabili di produzione
// =======================================================
type ProductionData = {
  cropType: string // esempio: "wheat"
  growthStage: 'seeding' | 'vegetative' | 'flowering' | 'maturation' | 'harvest'
  daysFromStart: number
  dailyGrowthRate: number // kg/ha alla data attuale
  currentYield: number // kg/ha cumulativo
  maturityTime: number // giorni necessari per arrivare alla raccolta
}

// =======================================================
// Tipi per i consumi delle risorse
// =======================================================
type ResourceConsumption = {
  water: number // litri per ha (giornalieri)
  fertilizers: {
    nitrogen: number // kg/ha
    phosphorus: number // kg/ha
    potassium: number // kg/ha
  }
  laborHours: number // ore/giorno
  machineHours: number // ore/giorno
  fuelCost: number // € al giorno
}

// =======================================================
// Indicatori economici
// =======================================================
type FinancialIndicators = {
  marketPrice: number // €/kg (simulato)
  estimatedRevenue: number // €
  operatingCost: number // €
  grossMargin: number // €
  cropEfficiency: number // %
}

// =======================================================
// Stato globale del simulatore
// =======================================================
export type SimulatorState = {
  day: number
  env: EnvironmentalData
  production: ProductionData
  resources: ResourceConsumption
  finance: FinancialIndicators
}
```

Se vuoi ti preparo anche **una funzione `nextDay(state: SimulatorState): SimulatorState`**. Vuoi che te la scriva direttamente?

---

### Assistant message 3

Perfetto ✅ Qui sotto trovi una **prima implementazione di `nextDay(...)`**:

```ts
/**
 * Esegue una simulazione "giorno successivo" aggiornando tutte
 * le variabili del SimulatorState.
 */
export function nextDay(state: SimulatorState): SimulatorState {
  // ------------------
  // 1. Simulazione condizioni ambientali
  // ------------------
  const temperatureAvg = randomInRange(15, 35)
  const precipitation = randomInRange(0, 30)
  const humidity = randomInRange(30, 90)
  const soilMoisture = Math.min(
    100,
    Math.max(0, state.env.soilMoisture + precipitation * 0.4 - temperatureAvg * 0.2),
  )

  // Eventi anomali (molto semplificato)
  const abnormalRoll = Math.random()
  let abnormalEvent: EnvironmentalData['abnormalEvent'] = 'none'
  if (abnormalRoll < 0.02) abnormalEvent = 'frost'
  else if (abnormalRoll < 0.04) abnormalEvent = 'hail'
  else if (abnormalRoll < 0.06) abnormalEvent = 'drought'

  // ------------------
  // 2. Calcolo tasso di crescita
  // (valore base moltiplicato per "efficienza" delle condizioni ambientali)
  // ------------------
  const baseGrowthRate = 30 // kg/ha al giorno (valore teorico)
  // calcola penalizzazione se temp troppo bassa o alta
  const tempPenalty =
    temperatureAvg < 10 || temperatureAvg > 35
      ? 0.4
      : temperatureAvg < 15 || temperatureAvg > 30
        ? 0.7
        : 1.0

  const moisturePenalty = soilMoisture < 30 ? 0.5 : soilMoisture > 80 ? 0.8 : 1.0

  // penalità per eventi anomali
  let abnormalPenalty = 1.0
  if (abnormalEvent === 'frost') abnormalPenalty = 0.4
  if (abnormalEvent === 'hail') abnormalPenalty = 0.5
  if (abnormalEvent === 'drought') abnormalPenalty = 0.3

  const dailyGrowthRate = baseGrowthRate * tempPenalty * moisturePenalty * abnormalPenalty

  const newYield = state.production.currentYield + dailyGrowthRate

  // Aggiornamento dello stadio di crescita
  const daysFromStart = state.production.daysFromStart + 1
  let growthStage = state.production.growthStage

  if (daysFromStart < state.production.maturityTime * 0.3) {
    growthStage = 'vegetative'
  } else if (daysFromStart < state.production.maturityTime * 0.7) {
    growthStage = 'flowering'
  } else if (daysFromStart < state.production.maturityTime) {
    growthStage = 'maturation'
  } else {
    growthStage = 'harvest'
  }

  // ------------------
  // 3. Consumi e costi
  // ------------------
  const water = Math.max(0, 100 - soilMoisture) * 5 // litri/ha
  const laborHours = 4 // fisso per semplicità
  const machineHours = growthStage === 'harvest' ? 6 : 2
  const fuelCost = machineHours * 4 // €/giorno (stimato)

  // fertilizzanti solo nei primi giorni
  const fertNitrogen = daysFromStart <= 20 ? 3 : 0
  const fertPhos = daysFromStart <= 15 ? 1 : 0
  const fertPot = daysFromStart <= 15 ? 1 : 0

  const operatingCost = fuelCost + laborHours * 10 + fertNitrogen * 1.2

  // ------------------
  // 4. Ricavi e indici economici
  // ------------------
  const marketPrice = randomInRange(0.18, 0.3) // €/kg
  const estimatedRevenue = newYield * marketPrice
  const grossMargin = estimatedRevenue - operatingCost

  // Efficienza rispetto a una resa teorica massima (es. 12000 kg/ha)
  const cropEfficiency = Math.min(100, (newYield / 12000) * 100)

  // ------------------
  // Return nuovo stato
  // ------------------
  return {
    day: state.day + 1,
    env: {
      ...state.env,
      temperatureMin: temperatureAvg - 3,
      temperatureMax: temperatureAvg + 3,
      temperatureAvg,
      precipitation,
      humidity,
      soilMoisture,
      abnormalEvent,
      windSpeed: randomInRange(0, 25),
      solarRadiation: randomInRange(100, 900),
      nutrients: {
        nitrogen: Math.max(0, state.env.nutrients.nitrogen - fertNitrogen),
        phosphorus: Math.max(0, state.env.nutrients.phosphorus - fertPhos),
        potassium: Math.max(0, state.env.nutrients.potassium - fertPot),
      },
    },
    production: {
      ...state.production,
      daysFromStart,
      dailyGrowthRate,
      currentYield: newYield,
      growthStage,
    },
    resources: {
      water,
      laborHours,
      machineHours,
      fuelCost,
      fertilizers: {
        nitrogen: fertNitrogen,
        phosphorus: fertPhos,
        potassium: fertPot,
      },
    },
    finance: {
      marketPrice,
      estimatedRevenue,
      operatingCost,
      grossMargin,
      cropEfficiency,
    },
  }
}

// Utility di supporto (distribuzione uniforme)
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}
```

# Claude Data Structure

```ts
// Enums essenziali
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

// Struttura dati semplificata
export interface DatiAzienda {
  // Identificazione
  id: string
  data: Date
  azienda: string

  // Dati Ambientali (4 valori chiave)
  temperatura: number // °C media giornaliera
  umidita: number // %
  precipitazioni: number // mm
  oreSole: number // ore

  // Dati Produzione (4 valori chiave)
  quantitaRaccolto: number // kg
  superficieColtivata: number // ettari
  qualitaProdotto: number // scala 1-10
  tipoColtivazione: TipoColtivazione

  // Dati Economici (3 valori chiave)
  costiProduzione: number // €
  ricavi: number // €
  margineProfitto: number // %

  // Gestione Risorse (3 valori chiave)
  consumoAcqua: number // litri
  consumoCarburante: number // litri
  oreLavoro: number // ore

  // KPI (2 valori chiave)
  efficienzaProduttiva: number // kg/ettaro
  sostenibilita: number // indice 1-10

  // Contesto
  stagione: Stagione
}

// Array per il dataset
export type DatasetAzienda = DatiAzienda[]

// Interfaccia per statistiche aggregate (opzionale)
export interface StatistichePeriodo {
  dataInizio: Date
  dataFine: Date
  mediaTemperatura: number
  totalePrecipitazioni: number
  produzioneTotale: number
  ricaviTotali: number
}
```
