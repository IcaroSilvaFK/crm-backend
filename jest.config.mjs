export default {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
     '^.+\\.(t|j)s$': "ts-jest"
  },

  testEnvironment: "@quramy/jest-prisma/environment"
}
