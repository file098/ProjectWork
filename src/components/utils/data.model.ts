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

export interface FarmData {
  id: string
  date: Date
  farmName: string

  temperature: number
  humidity: number
  rainfall: number
  sunshineHours: number

  harvestQuantity: number
  cultivatedArea: number
  productQuality: number
  cropType: CropType

  productionCosts: number
  revenue: number
  profitMargin: number

  waterConsumption: number
  fuelConsumption: number
  laborHours: number

  productivityEfficiency: number
  sustainability: number

  season: Season
}

export type FarmDataset = FarmData[]

export interface PeriodStatistics {
  startDate: Date
  endDate: Date
  averageTemperature: number
  totalRainfall: number
  totalProduction: number
  totalRevenue: number
}
