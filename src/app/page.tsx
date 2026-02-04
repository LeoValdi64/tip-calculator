"use client";

import { useState, useCallback } from "react";

const QUICK_TIP_OPTIONS = [15, 18, 20, 25] as const;
const MIN_TIP = 10;
const MAX_TIP = 30;

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(1);

  const bill = parseFloat(billAmount) || 0;
  const tipAmount = bill * (tipPercentage / 100);
  const grandTotal = bill + tipAmount;
  const totalPerPerson = grandTotal / splitCount;

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }, []);

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const decrementSplit = () => {
    setSplitCount((prev) => Math.max(1, prev - 1));
  };

  const incrementSplit = () => {
    setSplitCount((prev) => Math.min(20, prev + 1));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <main className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">Tip Calculator</h1>
          <p className="text-zinc-500 mt-2">Calculate and split your bill</p>
        </header>

        <div className="bg-zinc-900 rounded-2xl p-6 space-y-6 shadow-xl border border-zinc-800">
          {/* Bill Amount Input */}
          <div>
            <label
              htmlFor="bill-amount"
              className="block text-sm font-medium text-zinc-400 mb-2"
            >
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">
                $
              </span>
              <input
                id="bill-amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={billAmount}
                onChange={handleBillChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-4 pl-10 pr-4 text-2xl font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Quick Tip Buttons */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Quick Tip
            </label>
            <div className="grid grid-cols-4 gap-2">
              {QUICK_TIP_OPTIONS.map((tip) => (
                <button
                  key={tip}
                  onClick={() => setTipPercentage(tip)}
                  className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                    tipPercentage === tip
                      ? "bg-emerald-500 text-zinc-950"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {tip}%
                </button>
              ))}
            </div>
          </div>

          {/* Tip Percentage Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="tip-slider"
                className="text-sm font-medium text-zinc-400"
              >
                Tip Percentage
              </label>
              <span className="text-emerald-400 font-bold text-lg">
                {tipPercentage}%
              </span>
            </div>
            <input
              id="tip-slider"
              type="range"
              min={MIN_TIP}
              max={MAX_TIP}
              value={tipPercentage}
              onChange={(e) => setTipPercentage(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-zinc-600 mt-1">
              <span>{MIN_TIP}%</span>
              <span>{MAX_TIP}%</span>
            </div>
          </div>

          {/* Split Between People */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Split Between
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={decrementSplit}
                disabled={splitCount <= 1}
                className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xl hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Decrease split count"
              >
                −
              </button>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-zinc-100 w-12 text-center">
                  {splitCount}
                </span>
                <span className="text-zinc-500">
                  {splitCount === 1 ? "person" : "people"}
                </span>
              </div>
              <button
                onClick={incrementSplit}
                disabled={splitCount >= 20}
                className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xl hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Increase split count"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 bg-zinc-900 rounded-2xl p-6 space-y-4 border border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Tip Amount</span>
            <span className="text-xl font-semibold text-zinc-100">
              {formatCurrency(tipAmount)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Grand Total</span>
            <span className="text-xl font-semibold text-zinc-100">
              {formatCurrency(grandTotal)}
            </span>
          </div>
          <div className="border-t border-zinc-800 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-zinc-400">Per Person</span>
                {splitCount > 1 && (
                  <span className="text-zinc-600 text-sm ml-2">
                    ({splitCount} people)
                  </span>
                )}
              </div>
              <span className="text-2xl font-bold text-emerald-400">
                {formatCurrency(totalPerPerson)}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
