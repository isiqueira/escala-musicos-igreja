import prisma from '../src/lib/prisma';

async function generateMonthlySchedules(year: number, month: number) {
  const recurringSchedules = await prisma.recurringSchedule.findMany({
    include: { musician: true }
  });

  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1)
      }
    }
  });

  for (const event of events) {
    const weekOfMonth = Math.ceil(event.date.getDate() / 7);
    const dayOfWeek = event.date.toLocaleString('en-US', { weekday: 'long' });

    const schedulesToCreate = recurringSchedules.filter(rs =>
      rs.week_of_month === weekOfMonth && rs.day_of_week === dayOfWeek
    );

    for (const rs of schedulesToCreate) {
      await prisma.schedule.create({
        data: {
          event_id: event.id,
          musician_id: rs.musician_id,
          is_recurring: true
        }
      });
    }
  }
}

// Uso: node scripts/generate-monthly-schedules.js 2024 05
const [year, month] = process.argv.slice(2).map(Number);
generateMonthlySchedules(year, month);