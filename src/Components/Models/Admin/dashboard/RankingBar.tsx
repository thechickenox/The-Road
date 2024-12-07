import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';


export default function Ranking({data}: any){
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="cantidad" fill="#8884d8" />
        <XAxis dataKey="title" />
        <YAxis />
        <Legend verticalAlign="middle" layout="vertical" align="right" />
      </BarChart>
    </ResponsiveContainer>
  );
}
