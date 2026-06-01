export interface Signal {
  id: number;
  stockCode: string;
  stockName: string;
  signalType: string;
  message: string;
  baseValue: number;
  currentValue: number;
  changeRate: number;
  changeRatePercent: number;
  detectedAt: string;
}