import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CostsChartProps {
  propertyPrice: number;
  downPayment: number;
  imt: number;
  stampDuty: number;
  notaryFees: number;
  registrationFees: number;
}

const CostsChart: React.FC<CostsChartProps> = ({
                                                 propertyPrice,
                                                 downPayment,
                                                 imt,
                                                 stampDuty,
                                                 notaryFees,
                                                 registrationFees
                                               }) => {
  const { t } = useTranslation();

  const chartData = {
    labels: [
      t('calculator.downPayment'),
      t('calculator.imt'),
      t('calculator.stampDuty'),
      t('calculator.notaryFees'),
      t('calculator.registrationFees')
    ],
    datasets: [
      {
        data: [
          ( propertyPrice * downPayment ) / 100,
          imt,
          stampDuty,
          notaryFees,
          registrationFees,
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
          label: function (context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('pt-PT', {
                style: 'currency',
                currency: 'EUR'
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="mt-6">
      <Pie data={chartData} options={chartOptions}/>
    </div>
  );
};

export default CostsChart;
