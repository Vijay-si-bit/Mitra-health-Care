import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOOD_OPTIONS } from "@/lib/constants";

interface MoodDataPoint {
  date: string;
  mood: number;
  notes?: string;
}

interface MoodChartProps {
  data: MoodDataPoint[];
  title?: string;
  height?: number;
}

export default function MoodChart({ data, title = "Mood Trends", height = 300 }: MoodChartProps) {
  const formatTooltip = (value: number, name: string) => {
    const moodOption = MOOD_OPTIONS.find(option => option.value === value);
    return [
      `${moodOption?.emoji} ${moodOption?.label} (${value})`,
      "Mood"
    ];
  };

  const formatYAxisTick = (value: number) => {
    const moodOption = MOOD_OPTIONS.find(option => option.value === value);
    return moodOption?.emoji || value.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No mood data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                domain={[1, 5]}
                tick={{ fontSize: 12 }}
                tickFormatter={formatYAxisTick}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(value) => `Date: ${new Date(value).toLocaleDateString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
