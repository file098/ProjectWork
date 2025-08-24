import { FarmDataset, FarmData, Season, CropType } from '@/components/utils/data.model'

// Main composable for farm data simulation
export function useEngine() {
  // Generate weather data based on season
  const createWeatherData = (season: Season) => {
    // Base temperatures for each season - could probably adjust these
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
      humidity: 40 + Math.random() * 40, // somewhere between 40-80%
      rainfall: Math.random() * 20, // up to 20mm daily
      sunshineHours:
        season === Season.SUMMER
          ? 10 + Math.random() * 4 // summer gets more sun
          : 6 + Math.random() * 6, // other seasons are more variable
    }
  }

  // Calculate production metrics for different crop types
  const buildProductionData = (type: CropType, season: Season) => {
    // Different crops have different base yields
    const yieldsByType = {
      [CropType.CEREALS]: 3000,
      [CropType.VEGETABLES]: 15000,
      [CropType.FRUITS]: 8000,
    }

    // Summer and autumn are generally better for harvest
    const seasonModifier = season === Season.SUMMER || season === Season.AUTUMN ? 1.2 : 0.8
    const randomVariance = 0.8 + Math.random() * 0.4

    const baseYield = yieldsByType[type]

    return {
      harvestQuantity: baseYield * seasonModifier * randomVariance,
      cultivatedArea: 5 + Math.random() * 20, // between 5-25 hectares
      productQuality: 4 + Math.random() * 6, // quality from 4-10
      cropType: type,
    }
  }

  // Work out the economics - costs vs revenue
  const calculateFinancials = (production: number, area: number) => {
    const costPerHectare = 800 + Math.random() * 400 // 800-1200 euros per hectare
    const sellingPrice = 0.3 + Math.random() * 0.4 // 0.3-0.7 euros per kg

    const totalCosts = costPerHectare * area
    const totalRevenue = production * sellingPrice
    const profitMargin = ((totalRevenue - totalCosts) / totalRevenue) * 100

    return {
      productionCosts: Math.round(totalCosts),
      revenue: Math.round(totalRevenue),
      profitMargin: Math.round(profitMargin * 10) / 10,
    }
  }

  // Track resource usage across the farm
  const getResourceUsage = (area: number) => {
    // These are rough estimates based on typical farming operations
    const waterPerHectare = 2000 + Math.random() * 1000 // liters per hectare
    const fuelPerHectare = 80 + Math.random() * 40 // liters per hectare
    const laborPerHectare = 15 + Math.random() * 10 // hours per hectare

    return {
      waterConsumption: area * waterPerHectare,
      fuelConsumption: area * fuelPerHectare,
      laborHours: area * laborPerHectare,
    }
  }

  // Calculate key performance indicators
  const computeKPIs = (production: number, area: number, temperature: number) => {
    const efficiency = production / area

    // Sustainability takes a hit when it gets too hot
    let sustainabilityScore = 8 + Math.random() * 2
    if (temperature > 30) {
      sustainabilityScore -= 2
    }

    // Keep it within bounds
    sustainabilityScore = Math.min(10, Math.max(1, sustainabilityScore))

    return {
      productivityEfficiency: Math.round(efficiency),
      sustainability: Math.round(sustainabilityScore * 10) / 10,
    }
  }

  // Put it all together to create a complete data record
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

  // Generate a full dataset with multiple days of data
  const createDataset = (numberOfDays: number = 30): FarmDataset => {
    const dataset: FarmDataset = []
    const allSeasons = Object.values(Season)
    const allCrops = Object.values(CropType)

    for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
      // Pick random season and crop type for variety
      const randomSeason = allSeasons[Math.floor(Math.random() * allSeasons.length)]
      const randomCrop = allCrops[Math.floor(Math.random() * allCrops.length)]
      const dailyData = createSingleDayDataset(randomSeason, randomCrop)

      dataset.push(...dailyData)
    }

    return dataset
  }

  // Create a dataset for a single day
  const createSingleDayDataset = (
    season?: Season,
    cropType?: CropType,
    farmName: string = 'Demo Agricultural Farm',
    targetDate?: Date,
  ): FarmDataset => {
    const allSeasons = Object.values(Season)
    const allCrops = Object.values(CropType)

    // Use provided values or pick random ones
    const selectedSeason = season || allSeasons[Math.floor(Math.random() * allSeasons.length)]
    const selectedCrop = cropType || allCrops[Math.floor(Math.random() * allCrops.length)]

    const dailyData = buildCompleteRecord(`DATA_001`, farmName, selectedSeason, selectedCrop)

    // Set the date to the target date or today
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
