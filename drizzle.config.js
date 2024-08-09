/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:iI2JwQvlxj6t@ep-polished-dust-a5vnkoa1.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };