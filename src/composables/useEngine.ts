import { FarmDataset, FarmData, Season, CropType } from '@/components/utils/data.model'

export function useEngine() {
  const createWeatherData = (season: Season) => {
    const seasonalTemps = {
      [Season.WINTER]: 5,
      [Season.SPRING]: 15,
      [Season.SUMMER]: 28,
      [Season.AUTUMN]: 18,
    }

    const baseTemp = seasonalTemps[season]
    const tempVariation = (Math.random() - 0.5) * 10

    return {
      temperature: baseTemp + tempVariation,
      humidity: 40 + Math.random() * 40,
      rainfall: Math.random() * 20,
      sunshineHours: season === Season.SUMMER ? 10 + Math.random() * 4 : 6 + Math.random() * 6,
    }
  }

  const buildProductionData = (type: CropType, season: Season) => {
    const yieldsByType = {
      [CropType.CEREALS]: 3000,
      [CropType.VEGETABLES]: 15000,
      [CropType.FRUITS]: 8000,
    }

    const seasonModifier = season === Season.SUMMER || season === Season.AUTUMN ? 1.2 : 0.8
    const randomVariance = 0.8 + Math.random() * 0.4

    const baseYield = yieldsByType[type]

    return {
      harvestQuantity: baseYield * seasonModifier * randomVariance,
      cultivatedArea: 5 + Math.random() * 20,
      productQuality: 4 + Math.random() * 6,
      cropType: type,
    }
  }

  const calculateFinancials = (production: number, area: number) => {
    const costPerHectare = 800 + Math.random() * 400
    const sellingPrice = 0.3 + Math.random() * 0.4

    const totalCosts = costPerHectare * area
    const totalRevenue = production * sellingPrice
    const profitMargin = ((totalRevenue - totalCosts) / totalRevenue) * 100

    return {
      productionCosts: Math.round(totalCosts),
      revenue: Math.round(totalRevenue),
      profitMargin: Math.round(profitMargin * 10) / 10,
    }
  }

  const getResourceUsage = (area: number) => {
    const waterPerHectare = 2000 + Math.random() * 1000
    const fuelPerHectare = 80 + Math.random() * 40
    const laborPerHectare = 15 + Math.random() * 10

    return {
      waterConsumption: area * waterPerHectare,
      fuelConsumption: area * fuelPerHectare,
      laborHours: area * laborPerHectare,
    }
  }

  const computeKPIs = (production: number, area: number, temperature: number) => {
    const efficiency = production / area

    let sustainabilityScore = 8 + Math.random() * 2
    if (temperature > 30) {
      sustainabilityScore -= 2
    }

    sustainabilityScore = Math.min(10, Math.max(1, sustainabilityScore))

    return {
      productivityEfficiency: Math.round(efficiency),
      sustainability: Math.round(sustainabilityScore * 10) / 10,
    }
  }

  const buildCompleteRecord = (
    id: string,
    farmName: string,
    season: Season,
    cropType: CropType,
  ): FarmData => {
    const weatherData = createWeatherData(season)
    const productionData = buildProductionData(cropType, season)
    const financialData = calculateFinancials(
      productionData.harvestQuantity,
      productionData.cultivatedArea,
    )
    const resourceData = getResourceUsage(productionData.cultivatedArea)
    const performanceData = computeKPIs(
      productionData.harvestQuantity,
      productionData.cultivatedArea,
      weatherData.temperature,
    )

    return {
      id,
      date: new Date(),
      farmName,
      season,
      ...weatherData,
      ...productionData,
      ...financialData,
      ...resourceData,
      ...performanceData,
    }
  }

  const createDataset = (numberOfDays: number = 30): FarmDataset => {
    const dataset: FarmDataset = []
    const allSeasons = Object.values(Season)
    const allCrops = Object.values(CropType)

    for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
      const randomSeason = allSeasons[Math.floor(Math.random() * allSeasons.length)]
      const randomCrop = allCrops[Math.floor(Math.random() * allCrops.length)]
      const dailyData = createSingleDayDataset(randomSeason, randomCrop)

      dataset.push(...dailyData)
    }

    return dataset
  }

  const createSingleDayDataset = (
    season?: Season,
    cropType?: CropType,
    farmName: string = 'Demo Agricultural Farm',
    targetDate?: Date,
  ): FarmDataset => {
    const allSeasons = Object.values(Season)
    const allCrops = Object.values(CropType)

    const selectedSeason = season || allSeasons[Math.floor(Math.random() * allSeasons.length)]
    const selectedCrop = cropType || allCrops[Math.floor(Math.random() * allCrops.length)]

    const dailyData = buildCompleteRecord(`DATA_001`, farmName, selectedSeason, selectedCrop)

    dailyData.date = targetDate || new Date()

    return [dailyData]
  }

  return {
    buildCompleteRecord,
    createDataset,
    createSingleDayDataset,
    createWeatherData,
    buildProductionData,
    calculateFinancials,
    getResourceUsage,
    computeKPIs,
  }
}
