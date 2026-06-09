import carsData from '@/data/cars.json'
import type { Car, PriceAnalysis } from './types'

export function getAllCars(): Car[] {
  return carsData as Car[]
}

export function getCarById(id: string): Car | undefined {
  return (carsData as Car[]).find((car) => car.id === id)
}

export function getPriceAnalysis(car: Car): PriceAnalysis {
  const prices = car.comparables.map((c) => c.price)
  const average = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const percentageDiff = Math.round(((car.price - average) / average) * 100)

  let verdict: PriceAnalysis['verdict']
  let verdictLabel: string

  if (percentageDiff <= -5) {
    verdict = 'great'
    verdictLabel = 'Great Deal'
  } else if (percentageDiff <= 5) {
    verdict = 'fair'
    verdictLabel = 'Fair Price'
  } else {
    verdict = 'above'
    verdictLabel = 'Above Market'
  }

  return { average, min, max, percentageDiff, verdict, verdictLabel }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('en-GB').format(mileage) + ' miles'
}
