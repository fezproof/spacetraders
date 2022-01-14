import type { Load } from '@sveltejs/kit';
import type { Session } from 'src/hooks';

export type LoadFn = Load<{ session: Session }>;
