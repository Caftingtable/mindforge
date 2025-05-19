import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jul', value: 25 },
  { name: 'Aug', value: 20 },
  { name: 'Sep', value: 30 },
  { name: 'Oct', value: 22 },
  { name: 'Nov', value: 16 },
  { name: 'Dec', value: 30 },
];

const CustomBarChart = () => {
  return (
    <div className="w-full h-[300px] p-4 bg-primary rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" tickFormatter={(tick) => `${tick}`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#101017', borderRadius: '5px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" fill="#ffffff"  barSize={10} radius={[20, 20, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;