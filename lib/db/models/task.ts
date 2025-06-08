import pool from '../postgres';

export interface Task {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class TaskModel {
  static async getAll(): Promise<Task[]> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async getById(id: number): Promise<Task | null> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async create(name: string): Promise<Task> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO tasks (name) VALUES ($1) RETURNING *',
        [name]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async update(id: number, name: string): Promise<Task | null> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE tasks SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [name, id]
      );
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM tasks WHERE id = $1', [id]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}