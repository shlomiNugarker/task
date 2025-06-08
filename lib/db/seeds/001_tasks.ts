import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tasks').del();

  // Inserts seed entries
  await knex('tasks').insert([
    { name: 'לקנות מצרכים' },
    { name: 'לסיים את הפרויקט' },
    { name: 'להתקשר לרופא' },
    { name: 'לארגן את המשרד' }
  ]);
}