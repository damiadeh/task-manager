import { PrismaClient, Task, Prisma } from '@prisma/client';

export class TaskRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: [
        { completed: 'asc' },      // false (uncompleted) comes first
        { createdAt: 'desc' }      // then by creation date, newest first
      ]
    });
  }

  async findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id }
    });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data
    });
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id }
    });
  }

  async getStats(): Promise<{ total: number; completed: number; pending: number }> {
    const [total, completed] = await Promise.all([
      this.prisma.task.count(),
      this.prisma.task.count({
        where: { completed: true }
      })
    ]);

    return {
      total,
      completed,
      pending: total - completed
    };
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
