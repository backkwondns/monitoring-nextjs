import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface ChartType {
  data: { labels: string[]; datasets: { data: number[] }[] };
  title: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Chart(props: ChartType): JSX.Element {
  const { data, title } = props;
  const option = { plugins: { legend: { display: false }, title: { display: true, text: title } } };

  return <Line data={data} options={option} />;
}
