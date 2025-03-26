export function comparativeCount(dataSource: any, targetField: string) {
  const now = new Date();

  if (!dataSource.length) {
    return {
      count: 0,
      current30DayPeriod: 0,
      previous30DayPeriod: 0,
      difference: 0,
      hasGained: false,
    };
  }
  // 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  // 60 days ago
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(now.getDate() - 60);

  // Total count of items in the array
  const count = dataSource.length;

  // Entries within the last 30 days
  const current30DayPeriod = dataSource.filter((item) => {
    const createdAt = new Date(item[targetField]);
    return createdAt >= thirtyDaysAgo;
  }).length;

  // Entries between 30 and 60 days ago
  const previous30DayPeriod = dataSource.filter((item) => {
    const createdAt = new Date(item[targetField]);
    return createdAt < thirtyDaysAgo && createdAt >= sixtyDaysAgo;
  }).length;

  const difference = Math.abs(previous30DayPeriod - current30DayPeriod);

  return {
    count,
    current30DayPeriod,
    previous30DayPeriod,
    difference,
    hasGained: current30DayPeriod > previous30DayPeriod ? true : false,
  };
}
