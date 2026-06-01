import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { signalDetailStyles as styles } from "../../src/styles/signalDetailStyles";

export default function SignalDetailScreen() {
  const params = useLocalSearchParams();

  const formatDate = (value?: string | string[]) => {
    if (!value || Array.isArray(value)) return "-";

    const date = new Date(value);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  };

  const formatNumber = (value?: string | string[]) => {
    if (!value || Array.isArray(value)) return "-";

    return Number(value).toLocaleString();
  };

  const formatChangeRate = (value?: string | string[]) => {
    if (!value || Array.isArray(value)) return "-";

    const number = Number(value);

    return `${number > 0 ? "+" : ""}${number}%`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← 뒤로가기</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{params.stockName}</Text>
      <Text style={styles.code}>{params.stockCode}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Signal 정보</Text>

        <Text style={styles.label}>메시지</Text>
        <Text style={styles.value}>{params.message}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>기준값</Text>
        <Text style={styles.value}>
          {formatNumber(params.baseValue)} 원
        </Text>

        <Text style={styles.label}>현재값</Text>
        <Text style={styles.value}>
          {formatNumber(params.currentValue)} 원
        </Text>

        <Text style={styles.label}>변화율</Text>
        <Text style={styles.rate}>
          {formatChangeRate(params.changeRatePercent)}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>감지 시간</Text>
        <Text style={styles.value}>
          {formatDate(params.detectedAt)}
        </Text>
      </View>
    </View>
  );
}