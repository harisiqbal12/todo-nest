import { Todo } from '@prisma/client';

type TodoRes = Omit<Todo, 'updatedAt' | 'user_id'>;
