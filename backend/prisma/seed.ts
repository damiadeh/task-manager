import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Clear existing tasks
  await prisma.task.deleteMany();
  console.log('Cleared existing tasks');

  // Create sample tasks
  const tasks = [
    {
      title: 'Welcome to Task Manager!',
      description: 'This is your first task. Mark it as complete to see how the UI handles task completion.',
      priority: 'HIGH' as const,
      completed: true,
      createdAt: new Date('2024-01-15T10:00:00Z'),
      updatedAt: new Date('2024-01-15T10:00:00Z'),
    },
    {
      title: 'Explore the Features',
      description: 'Try creating new tasks, changing priorities, and filtering by different criteria.',
      priority: 'MEDIUM' as const,
      completed: false,
      createdAt: new Date('2024-01-15T11:00:00Z'),
      updatedAt: new Date('2024-01-15T11:00:00Z'),
    },
  ];

  for (const task of tasks) {
    const createdTask = await prisma.task.create({
      data: task,
    });
    console.log(`Created task: ${createdTask.title} (${createdTask.completed ? 'Completed' : 'Pending'})`);
  }

  // Get task statistics
  const stats = await prisma.task.groupBy({
    by: ['completed'],
    _count: {
      completed: true,
    },
  });

  const totalTasks = await prisma.task.count();
  const completedTasks = stats.find(s => s.completed)?._count.completed || 0;
  const pendingTasks = totalTasks - completedTasks;

  console.log('\n Database seeded successfully!');
  console.log(`Total tasks: ${totalTasks}`);
  console.log(`Completed tasks: ${completedTasks}`);
  console.log(`Pending tasks: ${pendingTasks}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database connection closed');
  });
