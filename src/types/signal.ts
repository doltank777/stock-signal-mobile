export interface Signal {
  id: number;
  stockCode: string;
  stockName: string;
  searchConditionId: number;
  searchConditionName: string;
  message: string;
  detectedAt: string;
}
