import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RISK_LEVELS } from "@/lib/constants";

interface RiskDataPoint {
  date: string;
  riskScore: number;
  level: string;
}

interface RiskChartProps {
  data: RiskDataPoint[];
  title?: string;
  height?: number;
}

export default function RiskChart({ data, title = "Risk Score Trends", height = 300 }: RiskChartProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 2.5) return RISK_LEVELS.LOW;
    if (score <= 5) return RISK_LEVELS.MODERATE;
    if (score <= 7.5) return RISK_LEVELS.HIGH;
    return RISK_LEVELS.CRITICAL;
  };

  const formatTooltip = (value: number) => {
    const level = getRiskLevel(value);
    return [`${value.toFixed(1)} - ${level.label}`, "Risk Score"];
  };

  const getAreaColor = (score: number) => {
    const level = getRiskLevel(score);
    switch (level.color) {
      case "green": return "#22c55e";
      case "yellow": return "#eab308";
      case "orange": return "#f97316";
      case "red": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const currentLevel = data.length > 0 ? getRiskLevel(data[data.length - 1].riskScore) : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {currentLevel && (
          <Badge 
            variant={currentLevel.color === "green" ? "default" : "destructive"}
            className={`
              ${currentLevel.color === "yellow" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              ${currentLevel.color === "orange" ? "bg-orange-500 hover:bg-orange-600" : ""}
            `}
          >
            {currentLevel.label}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No risk data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                domain={[0, 10]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(value) => `Date: ${new Date(value).toLocaleDateString()}`}
              />
              <Area 
                type="monotone" 
                dataKey="riskScore" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                fill="url(#riskGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
