
import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function DonutsCharts({ data }: any) {
    return (
            <PieChart width={400} height={400}>
                <Pie dataKey="value" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
            </PieChart>
    )
}