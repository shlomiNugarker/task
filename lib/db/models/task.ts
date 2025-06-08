import db from '../knex';

export interface Task {
  id: number;
  name: string;
}

export class TaskModel {
  private static readonly tableName = 'tasks';

  // Get all tasks (matching existing API)
  static async getAll(): Promise<Task[]> {
    return db(this.tableName).select('*').orderBy('id', 'desc');
  }

  // Get task by ID
  static async getById(id: number): Promise<Task | undefined> {
    return db(this.tableName).where({ id }).first();
  }

  // Create new task (matching existing API)
  static async create(name: string): Promise<Task> {
    const [newTask] = await db(this.tableName)
      .insert({ name })
      .returning('*');
    
    return newTask;
  }

  // Update task
  static async update(id: number, name: string): Promise<Task | undefined> {
    const [updatedTask] = await db(this.tableName)
      .where({ id })
      .update({ name })
      .returning('*');
    
    return updatedTask;
  }

  // Delete task
  static async delete(id: number): Promise<boolean> {
    const deletedRows = await db(this.tableName).where({ id }).del();
    return deletedRows > 0;
  }

  // Count tasks
  static async count(): Promise<number> {
    const result = await db(this.tableName).count('id as count').first();
    return parseInt(result?.count as string) || 0;
  }
} 