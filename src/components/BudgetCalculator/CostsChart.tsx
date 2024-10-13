import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CostsChartProps {
  propertyPrice: number;
  downPayment: number;
}

const CostsChart: React.FC<CostsChartProps> = ({ propertyPrice, downPayment }) => {
  const chartData = {
    labels: ['Down Payment', 'IMT', 'Stamp Duty', 'Notary Fees', 'Registration Fees'],
    datasets: [
      {
        data: [
          (propertyPrice * downPayment) / 100,
          propertyPrice * 0.06, // IMT (simplified)
          propertyPrice * 0.008, // Stamp Duty
          1000, // Notary Fees (example)
          500, // Registration Fees (example)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="mt-6">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default CostsChart;