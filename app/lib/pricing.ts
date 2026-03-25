export type Currency = 'COP' | 'USD' | 'VES';

export interface PricingTier {
  weight: string;
  dimensions: string;
  priceCOP: number;
  pricePerKgCOP: number;
}

// Exchange rates (approximate - should be updated regularly)
export const EXCHANGE_RATES: Record<Currency, number> = {
  COP: 1,
  USD: 0.00023, // 1 COP = 0.00023 USD
  VES: 0.0089,  // 1 COP = 0.0089 VES
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  COP: '$',
  USD: '$',
  VES: 'Bs.',
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  COP: 'COP',
  USD: 'USD',
  VES: 'VES',
};

export const PRICING_TIERS: PricingTier[] = [
  { weight: '2 KG', dimensions: '30x20x15 cm', priceCOP: 29900, pricePerKgCOP: 14950 },
  { weight: '4 KG', dimensions: '40x30x20 cm', priceCOP: 49900, pricePerKgCOP: 12475 },
  { weight: '7 KG', dimensions: '50x35x25 cm', priceCOP: 79900, pricePerKgCOP: 11414 },
  { weight: '10 KG', dimensions: '60x40x30 cm', priceCOP: 109900, pricePerKgCOP: 10990 },
  { weight: '15 KG', dimensions: '70x45x35 cm', priceCOP: 149900, pricePerKgCOP: 9993 },
  { weight: '25 KG', dimensions: '80x50x40 cm', priceCOP: 229900, pricePerKgCOP: 9196 },
  { weight: '40 KG', dimensions: '90x60x50 cm', priceCOP: 349900, pricePerKgCOP: 8748 },
  { weight: '50 KG', dimensions: '100x70x55 cm', priceCOP: 399900, pricePerKgCOP: 7998 },
  { weight: '60 KG', dimensions: '110x75x60 cm', priceCOP: 449900, pricePerKgCOP: 7498 },
  { weight: '80 KG', dimensions: '120x80x65 cm', priceCOP: 549900, pricePerKgCOP: 6874 },
];

export const VOLUMETRIC_PRICING = [
  { range: '1 - 4 KG / VOL', priceCOP: 16900 },
  { range: '4.1 - 5 KG / VOL', priceCOP: 15900 },
  { range: '5.1 - 20 KG / VOL', priceCOP: 14900 },
  { range: '20.1 - 40 KG / VOL', priceCOP: 13900 },
  { range: '40.1 - 60 KG / VOL', priceCOP: 13249 },
  { range: '60.1 - 100 KG / VOL', priceCOP: 12749 },
];

export function convertPrice(priceCOP: number, currency: Currency): number {
  return Math.round(priceCOP * EXCHANGE_RATES[currency] * 100) / 100;
}

export function formatPrice(price: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  if (currency === 'COP') {
    return `${symbol}${price.toLocaleString('es-CO')}`;
  }
  if (currency === 'VES') {
    return `${symbol}${price.toLocaleString('es-VE', { minimumFractionDigits: 2 })}`;
  }
  return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}
