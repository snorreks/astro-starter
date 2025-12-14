## [2025-11-30 12:08] Failure Event

- **Type**: User Correction
- **File**: `None`
- **Error**: "stuck again btw"
- **Root Cause**: My debugging process is flawed. I am not able to solve the hanging test issue. I am repeating the same mistakes. The user is providing the solution. My assumption that running in serial would fix the issue was incorrect.
- **Correction Applied**: I will follow the user's suggestion and set `process.env.CI` to `true` when running the test. This will force a new server to start for each test run.
