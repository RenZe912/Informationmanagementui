import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Course } from '../types';
import { tagColors } from '../data';
import { GraduationCap, TrendingUp } from 'lucide-react';

interface OverviewSectionProps {
  courses: Course[];
}

export function OverviewSection({ courses }: OverviewSectionProps) {
  // Calculate tag distribution
  const tagDistribution = useMemo(() => {
    const distribution: Record<string, number> = {};
    
    courses.forEach((course) => {
      distribution[course.tag] = (distribution[course.tag] || 0) + 1;
    });

    return Object.entries(distribution)
      .map(([tag, count]) => ({
        name: tag,
        value: count,
        color: tagColors[tag] || '#008E6B',
        percentage: ((count / courses.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);
  }, [courses]);

  const totalCourses = courses.length;
  const averageProgress = useMemo(() => {
    if (courses.length === 0) return 0;
    const total = courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(total / courses.length);
  }, [courses]);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-border">
          <p className="font-semibold text-foreground mb-1">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value} course{data.value !== 1 ? 's' : ''} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="lg:col-span-1 space-y-4">
          {/* Total Courses */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium opacity-90">Total Courses</span>
            </div>
            <div className="text-4xl font-bold">{totalCourses}</div>
          </div>

          {/* Average Progress */}
          <div className="bg-muted rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                Average Progress
              </span>
              <span className="text-2xl font-bold text-foreground">{averageProgress}%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2 overflow-hidden">
              <div
                style={{ width: `${averageProgress}%` }}
                className="h-full bg-accent transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-2">
          <div className="flex items-start gap-6">
            {/* Chart */}
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={tagDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tagDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Label */}
              <div className="relative -mt-44 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-3xl font-bold text-foreground">{totalCourses}</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
            </div>

            {/* Legend */}
            <div className="w-48 space-y-2">
              <div className="text-sm font-medium text-muted-foreground mb-3">
                By Category
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tagDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm group hover:bg-muted/50 rounded-lg p-2 transition-colors cursor-default"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-foreground truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-medium">{item.value}</span>
                      <span className="text-xs">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
