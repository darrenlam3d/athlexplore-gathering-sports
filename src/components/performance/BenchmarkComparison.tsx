
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BenchmarkComparison = () => {
  const benchmarkData = [
    {
      name: 'Speed',
      you: 85,
      average: 70,
      top10: 92,
    },
    {
      name: 'Endurance',
      you: 80,
      average: 72,
      top10: 90,
    },
    {
      name: 'Ball Control',
      you: 75,
      average: 68,
      top10: 88,
    },
    {
      name: 'Passing',
      you: 92,
      average: 75,
      top10: 95,
    },
    {
      name: 'Positioning',
      you: 88,
      average: 73,
      top10: 94,
    },
  ];

  // Chart configuration for styling
  const chartConfig = {
    you: {
      label: "You",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    },
    average: {
      label: "Avg. Central Midfielder",
      theme: {
        light: "#6b7280",
        dark: "#6b7280"
      }
    },
    top10: {
      label: "Top 10%",
      theme: {
        light: "#f59e0b",
        dark: "#f59e0b"
      }
    }
  };

  return (
    <Card className="border-gray-700 bg-card text-card-foreground min-h-[750px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Benchmark Comparison</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          How you compare to similar players (Central Midfielders, Age 22-25)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          {/* Legend positioned at the top-right, outside the chart area */}
          <div className="flex justify-end">
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-2"></div>
                <span>You</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#6b7280] mr-2"></div>
                <span>Avg. Central Midfielder</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></div>
                <span>Top 10%</span>
              </div>
            </div>
          </div>
          
          {/* Chart container with fixed height and clearly separate from content below */}
          <div className="h-[450px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={benchmarkData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.375rem' }}
                    itemStyle={{ color: '#f3f4f6' }}
                    labelStyle={{ color: '#f3f4f6', fontWeight: 'bold' }}
                  />
                  {/* Removed Legend from within the chart */}
                  <Bar dataKey="average" fill="var(--color-average)" />
                  <Bar dataKey="you" fill="var(--color-you)" />
                  <Bar dataKey="top10" fill="var(--color-top10)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {/* Insights section - clearly separate from the chart with more spacing */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h4 className="text-athlex-accent font-medium">Top Performance</h4>
              <p className="text-sm mt-1">Your passing accuracy (92%) is in the top 15% of central midfielders in your age group.</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h4 className="text-athlex-accent font-medium">Area to Improve</h4>
              <p className="text-sm mt-1">Your ball control (75%) is above average but has the largest gap compared to top performers.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenchmarkComparison;
