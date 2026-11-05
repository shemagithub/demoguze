"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  formatInCurrency,
  getCurrency,
  type CurrencyCode,
  type CurrencyOption,
} from "@/data/currencies";

interface CurrencyContextValue {
  code: CurrencyCode;
  currency: CurrencyOption;
  currencies: CurrencyOption[];
  setCode: (code: CurrencyCode) => void;
  format: (amountNgn: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
  }, []);

  const format = useCallback(
    (amountNgn: number) => formatInCurrency(amountNgn, code),
    [code],
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      code,
      currency: getCurrency(code),
      currencies: CURRENCIES,
      setCode,
      format,
    }),
    [code, setCode, format],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
