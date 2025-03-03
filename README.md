# Backend

## Manage database

Local database is configured to run by Docker Compose at `./docker` directory. You can start the database by running the following command:

```bash
nx run docker:up
```

In development environment, you can use the following commands to manage the database:

```bash
nx run db:push # sync the database with the current schema
nx run db:push:test # sync the test database with the current schema
nx run db:studio # launch the Drizzle studio UI
nx run db:generate # generate migration for latest database changes
```

For more information refer to the following:

- `./db/project.json` for NX tasks
- [NX tasks](https://nx.dev/features/run-tasks) for more information on how to run tasks
- [Drizzle CLI](https://orm.drizzle.team/docs/kit-overview) for more information on how to manage the database
