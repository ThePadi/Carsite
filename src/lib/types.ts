export interface Comparable {
  source: string
  price: number
  mileage: number
}

export interface Car {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  price: number
  fuelType: string
  transmission: string
  colour: string
  engine: string
  power: string
  doors: number
  bodyType: string
  images: string[]
  description: string
  features: string[]
  comparables: Comparable[]
}

export interface PriceAnalysis {
  average: number
  min: number
  max: number
  percentageDiff: number
  verdict: 'great' | 'fair' | 'above'
  verdictLabel: string
}
