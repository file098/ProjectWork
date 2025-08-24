// Season definitions for agricultural data
export enum Season {
  SPRING = 'spring',
  SUMMER = 'summer',
  AUTUMN = 'autumn',
  WINTER = 'winter',
}

export enum CropType {
  CEREALS = 'cereals',
  VEGETABLES = 'vegetables',
  FRUITS = 'fruits',
}

// Main data structure for farm operations
export interface FarmData {
  id: string
  date: Date
  farmName: string

  // Environmental metrics - key indicators for crop success
  temperature: number // daily average temp in Celsius
  humidity: number // humidity percentage
  rainfall: number // rainfall in mm
  sunshineHours: number // sunshine hours

  // Production data - what we're actually growing
  harvestQuantity: number // harvest quantity in kg
  cultivatedArea: number // cultivated area in hectares
  productQuality: number // product quality rating (1-10)
  cropType: CropType

  // Financial tracking
  productionCosts: number // production costs in euros
  revenue: number // revenue in euros
  profitMargin: number // profit margin percentage

  // Resource management
  waterConsumption: number // water consumption in liters
  fuelConsumption: number // fuel consumption in liters
  laborHours: number // labor hours

  // Performance indicators
  productivityEfficiency: number // productivity efficiency (kg/hectare)
  sustainability: number // sustainability index (1-10)

  season: Season
}

export type FarmDataset = FarmData[]

// Stats for analyzing periods of time
export interface PeriodStatistics {
  startDate: Date
  endDate: Date
  averageTemperature: number
  totalRainfall: number
  totalProduction: number
  totalRevenue: number
}
