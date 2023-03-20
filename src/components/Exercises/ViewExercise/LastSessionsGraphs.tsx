import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Heading } from 'src/components/shared/Heading';
import { useViewExerciseContext } from './ViewExerciseContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  color: 'rgb(203, 213, 225)',
  scales: {
    x: {
      grid: {
        color: 'rgb(100, 116, 139)'
      },
      ticks: {
        padding: 20,
        color: 'rgb(203, 213, 225)'
      }
    },
    y: {
      grid: {
        color: 'rgb(100, 116, 139)'
      },
      ticks: {
        padding: 20,
        color: 'rgb(203, 213, 225)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      displayColors: false,
      animation: false,
      callbacks: {
        title: (item: any) =>
          item[0].label === '0'
            ? 'Última rutina'
            : `Hace ${Math.abs(parseInt(item[0].label, 10))} rutina${
                item[0].label !== '-1' ? 's' : ''
              }`
      }
    }
  }
};

export function LastSessionsGraphs() {
  const { dataSets } = useViewExerciseContext();

  console.log({ dataSets });

  if (dataSets.type === 'STRENGTH') {
    return (
      <>
        <TotalWeightGraph />
      </>
    );
  }

  return (
    <>
      <TotalDistance />
      <TotalTime />
    </>
  );
}

function TotalDistance() {
  const { dataSets } = useViewExerciseContext();

  const data = {
    labels: (dataSets as any).totalDistance.map((e: any) => e.id),
    datasets: [
      {
        data: (dataSets as any).totalDistance.map((e: any) => e.distance),
        borderColor: '#14b8a6',
        backgroundColor: 'rgb(100, 116, 139)'
      }
    ]
  };

  return (
    <div className='p-4 rounded-lg bg-slate-600 text-slate-300'>
      <Heading size='lg'>Distancia total (m)</Heading>

      <Line data={data} options={options as any} />
    </div>
  );
}

function TotalTime() {
  const { dataSets } = useViewExerciseContext();

  const data = {
    labels: (dataSets as any).totalDistance.map((e: any) => e.id),
    datasets: [
      {
        data: (dataSets as any).totalTime.map((e: any) => e.mins),
        borderColor: '#14b8a6',
        backgroundColor: 'rgb(100, 116, 139)'
      }
    ]
  };

  return (
    <div className='p-4 rounded-lg bg-slate-600 text-slate-300'>
      <Heading size='lg'>Tiempo total (mins)</Heading>

      <Line data={data} options={options as any} />
    </div>
  );
}

function TotalWeightGraph() {
  const { dataSets } = useViewExerciseContext();

  const data = {
    labels: (dataSets as any).totalWeight.map((e: any) => e.id),
    datasets: [
      {
        data: (dataSets as any).totalWeight.map((e: any) => e.weight),
        borderColor: '#14b8a6',
        backgroundColor: 'rgb(100, 116, 139)'
      }
    ]
  };

  return (
    <div className='p-4 rounded-lg bg-slate-600 text-slate-300'>
      <Heading size='lg'>Peso total (lbs)</Heading>

      <Line data={data} options={options as any} />
    </div>
  );
}
