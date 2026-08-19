export interface Signal {
  id: number;
  stockCode: string;
  stockName: string;
  signalType: string;
  message: string;
  baseValue: number | null;
  currentValue: number | null;
  changeRate: number | null;
  changeRatePercent: number | null;
  detectedAt: string;
}
