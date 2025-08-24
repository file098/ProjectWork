import {
  DatasetAzienda,
  DatiAzienda,
  Stagione,
  TipoColtivazione,
} from '@/components/utils/data.model'

// Main composable for farm data simulation
export function useEngine() {
  // Generate weather data based on season
  const createWeatherData = (stagione: Stagione) => {
    // Base temperatures for each season - could probably adjust these
    const seasonalTemps = {
      [Stagione.INVERNO]: 5,
      [Stagione.PRIMAVERA]: 15,
      [Stagione.ESTATE]: 28,
      [Stagione.AUTUNNO]: 18,
    }

    const baseTemp = seasonalTemps[stagione]
    const tempVariation = (Math.random() - 0.5) * 10

    return {
      temperatura: baseTemp + tempVariation,
      umidita: 40 + Math.random() * 40, // somewhere between 40-80%
      precipitazioni: Math.random() * 20, // up to 20mm daily
      oreSole:
        stagione === Stagione.ESTATE
          ? 10 + Math.random() * 4 // summer gets more sun
          : 6 + Math.random() * 6, // other seasons are more variable
    }
  }

  // Calculate production metrics for different crop types
  const buildProductionData = (tipo: TipoColtivazione, stagione: Stagione) => {
    // Different crops have different base yields
    const yieldsByType = {
      [TipoColtivazione.CEREALI]: 3000,
      [TipoColtivazione.ORTAGGI]: 15000,
      [TipoColtivazione.FRUTTA]: 8000,
    }

    // Summer and autumn are generally better for harvest
    const seasonModifier = stagione === Stagione.ESTATE || stagione === Stagione.AUTUNNO ? 1.2 : 0.8
    const randomVariance = 0.8 + Math.random() * 0.4

    const baseYield = yieldsByType[tipo]

    return {
      quantitaRaccolto: baseYield * seasonModifier * randomVariance,
      superficieColtivata: 5 + Math.random() * 20, // between 5-25 hectares
      qualitaProdotto: 4 + Math.random() * 6, // quality from 4-10
      tipoColtivazione: tipo,
    }
  }

  // Work out the economics - costs vs revenue
  const calculateFinancials = (produzione: number, superficie: number) => {
    const costPerHectare = 800 + Math.random() * 400 // 800-1200 euros per hectare
    const sellingPrice = 0.3 + Math.random() * 0.4 // 0.3-0.7 euros per kg

    const totalCosts = costPerHectare * superficie
    const totalRevenue = produzione * sellingPrice
    const profitMargin = ((totalRevenue - totalCosts) / totalRevenue) * 100

    return {
      costiProduzione: Math.round(totalCosts),
      ricavi: Math.round(totalRevenue),
      margineProfitto: Math.round(profitMargin * 10) / 10,
    }
  }

  // Track resource usage across the farm
  const getResourceUsage = (superficie: number) => {
    // These are rough estimates based on typical farming operations
    const waterPerHectare = 2000 + Math.random() * 1000 // liters per hectare
    const fuelPerHectare = 80 + Math.random() * 40 // liters per hectare
    const laborPerHectare = 15 + Math.random() * 10 // hours per hectare

    return {
      consumoAcqua: superficie * waterPerHectare,
      consumoCarburante: superficie * fuelPerHectare,
      oreLavoro: superficie * laborPerHectare,
    }
  }

  // Calculate key performance indicators
  const computeKPIs = (produzione: number, superficie: number, temperatura: number) => {
    const efficiency = produzione / superficie

    // Sustainability takes a hit when it gets too hot
    let sustainabilityScore = 8 + Math.random() * 2
    if (temperatura > 30) {
      sustainabilityScore -= 2
    }

    // Keep it within bounds
    sustainabilityScore = Math.min(10, Math.max(1, sustainabilityScore))

    return {
      efficienzaProduttiva: Math.round(efficiency),
      sostenibilita: Math.round(sustainabilityScore * 10) / 10,
    }
  }

  // Put it all together to create a complete data record
  const buildCompleteRecord = (
    id: string,
    azienda: string,
    stagione: Stagione,
    tipoColtivazione: TipoColtivazione,
  ): DatiAzienda => {
    const weatherData = createWeatherData(stagione)
    const productionData = buildProductionData(tipoColtivazione, stagione)
    const financialData = calculateFinancials(
      productionData.quantitaRaccolto,
      productionData.superficieColtivata,
    )
    const resourceData = getResourceUsage(productionData.superficieColtivata)
    const performanceData = computeKPIs(
      productionData.quantitaRaccolto,
      productionData.superficieColtivata,
      weatherData.temperatura,
    )

    return {
      id,
      data: new Date(),
      azienda,
      stagione,
      ...weatherData,
      ...productionData,
      ...financialData,
      ...resourceData,
      ...performanceData,
    }
  }

  // Generate a full dataset with multiple days of data
  const createDataset = (numberOfDays: number = 30): DatasetAzienda => {
    const dataset: DatasetAzienda = []
    const allSeasons = Object.values(Stagione)
    const allCrops = Object.values(TipoColtivazione)

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
    stagione?: Stagione,
    tipoColtivazione?: TipoColtivazione,
    azienda: string = 'Azienda Agricola Demo',
    targetDate?: Date,
  ): DatasetAzienda => {
    const allSeasons = Object.values(Stagione)
    const allCrops = Object.values(TipoColtivazione)

    // Use provided values or pick random ones
    const selectedSeason = stagione || allSeasons[Math.floor(Math.random() * allSeasons.length)]
    const selectedCrop = tipoColtivazione || allCrops[Math.floor(Math.random() * allCrops.length)]

    const dailyData = buildCompleteRecord(`DATA_001`, azienda, selectedSeason, selectedCrop)

    // Set the date to the target date or today
    dailyData.data = targetDate || new Date()

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
