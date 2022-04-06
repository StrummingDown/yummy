import { connect } from 'mongoose';

const DATABASE_NAME = 'GraphQL';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => connect(`mongodb://localhost/${DATABASE_NAME}`),
  },
];
