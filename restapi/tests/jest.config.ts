export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["solidRouter.ts"],
	setupFiles: ["<rootDir>/tests/setEnvVars.ts"]
}