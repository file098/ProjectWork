import { FarmDataset, FarmData, Season, CropType } from '@/components/utils/data.model'
import { ref } from 'vue'

export function useEngine() {
  const running = ref(false)
  const timeframe = ref('7')
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

  const calculateFinancials = (
    production: number,
    area: number,
    cropType: CropType,
    season: Season,
    quality: number,
  ) => {
    // Base costs per hectare by crop type (in USD)
    const baseCostsPerHectare = {
      [CropType.CEREALS]: 1200, // Seeds, fertilizer, machinery
      [CropType.VEGETABLES]: 2800, // Higher labor, irrigation, protection
      [CropType.FRUITS]: 3500, // Tree maintenance, specialized equipment
    }

    // Market prices per kg/ton by crop type (in USD)
    const marketPrices = {
      [CropType.CEREALS]: 0.45, // ~$450/ton for wheat/corn
      [CropType.VEGETABLES]: 1.8, // ~$1800/ton for mixed vegetables
      [CropType.FRUITS]: 2.2, // ~$2200/ton for fruits
    }

    // Seasonal price multipliers (supply/demand fluctuations)
    const seasonalMultipliers = {
      [Season.SPRING]: 1.15, // Higher prices, lower supply
      [Season.SUMMER]: 0.9, // Peak harvest, lower prices
      [Season.AUTUMN]: 1.05, // Good harvest season
      [Season.WINTER]: 1.25, // Limited supply, higher prices
    }

    // Quality multiplier affects selling price (4-10 scale)
    const qualityMultiplier = 0.7 + (quality - 4) * 0.05 // Range: 0.7 to 1.0

    // Calculate variable costs (10-25% variation)
    const costVariation = 0.85 + Math.random() * 0.3
    const baseCost = baseCostsPerHectare[cropType]
    const totalCosts = baseCost * area * costVariation

    // Calculate revenue with market dynamics
    const basePrice = marketPrices[cropType]
    const seasonalPrice = basePrice * seasonalMultipliers[season]
    const finalPrice = seasonalPrice * qualityMultiplier
    const totalRevenue = production * finalPrice

    // Calculate profit margin
    const profit = totalRevenue - totalCosts
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : -100

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
      cropType,
      season,
      productionData.productQuality,
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

  const exportDataToFile = (dataset: FarmDataset, filename: string = 'farm-data-export.json') => {
    const dataStr = JSON.stringify(dataset, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  const exportDataToCsv = (dataset: FarmDataset, filename: string = 'farm-data-export.csv') => {
    if (dataset.length === 0) return

    const headers = Object.keys(dataset[0]).join(',')
    const csvContent = dataset
      .map((row) =>
        Object.values(row)
          .map((value) => (typeof value === 'string' && value.includes(',') ? `"${value}"` : value))
          .join(','),
      )
      .join('\n')

    const fullCsvContent = headers + '\n' + csvContent
    const csvBlob = new Blob([fullCsvContent], { type: 'text/csv' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(csvBlob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  return {
    running,
    timeframe,
    buildCompleteRecord,
    createDataset,
    createSingleDayDataset,
    createWeatherData,
    buildProductionData,
    calculateFinancials,
    getResourceUsage,
    computeKPIs,
    exportDataToFile,
    exportDataToCsv,
  }
}
