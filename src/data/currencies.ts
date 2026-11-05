export type CurrencyCode = "EUR" | "USD" | "GBP" | "NGN";

export interface CurrencyOption {
  code: CurrencyCode;
  label: string;
  region: string;
  symbol: string;
  /** Multiply NGN base price by this to get display amount. */
  rateFromNgn: number;
  /** CSS background for the small flag disc in the header. */
  flag: string;
}

/** Product prices in data are stored as NGN; rates are demo approximations. */
export const CURRENCIES: CurrencyOption[] = [
  {
    code: "EUR",
    label: "Euro",
    region: "Europe",
    symbol: "€",
    rateFromNgn: 1 / 1600,
    flag: "linear-gradient(180deg,#003399 50%,#FFCC00 50%)",
  },
  {
    code: "USD",
    label: "US Dollar",
    region: "United States",
    symbol: "$",
    rateFromNgn: 1 / 1500,
    flag: "linear-gradient(180deg,#B22234 33%,#fff 33% 66%,#3C3B6E 66%)",
  },
  {
    code: "GBP",
    label: "British Pound",
    region: "United Kingdom",
    symbol: "£",
    rateFromNgn: 1 / 1900,
    flag: "linear-gradient(135deg,#012169 0 40%,#C8102E 40% 60%,#fff 60%)",
  },
  {
    code: "NGN",
    label: "Nigerian Naira",
    region: "Nigeria",
    symbol: "₦",
    rateFromNgn: 1,
    flag: "linear-gradient(90deg,#008751 33%,#fff 33% 66%,#008751 66%)",
  },
];

export const DEFAULT_CURRENCY: CurrencyCode = "EUR";

export function getCurrency(code: CurrencyCode): CurrencyOption {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function convertFromNgn(amountNgn: number, code: CurrencyCode): number {
  return amountNgn * getCurrency(code).rateFromNgn;
}

export function formatInCurrency(amountNgn: number, code: CurrencyCode): string {
  const { symbol, rateFromNgn } = getCurrency(code);
  const converted = amountNgn * rateFromNgn;
  const locale =
    code === "NGN" ? "en-NG" : code === "EUR" ? "de-DE" : code === "GBP" ? "en-GB" : "en-US";
  return `${symbol} ${converted.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
