import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'May', value: 0 },
  { name: 'Jun', value: 15000 },
  { name: 'Jul', value: 30000 },
  { name: 'Aug', value: 20000 },
  { name: 'Sep', value: 40000 },
  { name: 'Oct', value: 25000 },
  { name: 'Nov', value: 50000 },
  { name: 'Dec', value: 60000 },
];

const CustomLineChart = () => {
  return (
    <div className="w-full h-[300px] p-4 bg-primary rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" tickFormatter={(tick) => `${tick / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1C2A48', color: '#ffffff', borderRadius: '5px' }}
            itemStyle={{ color: '#ffffff' }}
          />
          <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;