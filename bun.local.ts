let isBuildingLib = false;

const localPackageFiles = {
  packageJson: Bun.file('package.json'),
  license: Bun.file('LICENSE'),
} as const;

for (const key in localPackageFiles) {
  const file = localPackageFiles[key as keyof typeof localPackageFiles];
  await Bun.write(`local-package/${file.name}`, file);
}

const buildLib = async () => {
  if (isBuildingLib) return;
  isBuildingLib = true;
  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './local-package/dist',
    target: 'node',
    external: ['react'],
    minify: true,
  });
  isBuildingLib = false;
};

const typescriptWatchArgs = [
  'tsc',
  '--project',
  'tsconfig.json',
  '--outDir',
  'local-package/dist',
  '--watch',
];

let typescriptWatchProcessError: string | undefined;

const typescriptWatchProcess = Bun.spawn(typescriptWatchArgs, {
  stdout: 'pipe',
  onExit: (proc, exitCode, signalCode, error) => {
    if (exitCode !== 0) typescriptWatchProcessError = error?.message;
  },
});

const read = async () => {
  const reader = typescriptWatchProcess.stdout.getReader();

  const printGreenLine = (...messages: Array<string>) => {
    let logs: Array<string> = [];
    for (const message of messages) logs.push(`\x1b[32m${message}\x1b[0m`);
    console.log(logs.join(''));
  };

  const printRedLine = (...messages: Array<string>) => {
    let logs: Array<string> = [];
    for (const message of messages) logs.push(`\x1b[31m${message}\x1b[0m`);
    console.log(logs.join(''));
  };

  let previousIterationData: { logs?: Array<string> } | undefined;
  while (true) {
    try {
      const { done, value } = await reader.read();
      if (done) break;
      const decodedValue = new TextDecoder().decode(value);
      const isSuccess = /Found 0 error/g.test(decodedValue);
      const isError =
        /Found \d+ error/g.test(decodedValue) || /error TS\d+:/g.test(decodedValue);
      if (isSuccess) {
        await buildLib();
        printGreenLine('\u001bc', 'Compilation successful. Watching for file changes.');
      } else if (isError) {
        const logs: Array<string> = [...(previousIterationData?.logs ?? [])];
        const [errorList, errorCount] = decodedValue.split('-');
        const errorLines = errorList.split('\n');
        for (const line of errorLines) {
          if (/error TS\d+:/g.test(line)) logs.push(line);
        }
        if (errorCount) {
          logs.push(errorCount.trim());
          printRedLine('\u001bc', `Compilation failed.\n\n${logs.join('\n\n')}`);
          previousIterationData = undefined;
          continue;
        }
        previousIterationData = { logs };
      }
    } catch (err) {
      console.log('Error reading TypeScript watch process stdout:', err);
      break;
    }
  }
};

read();

const exit = () => {
  if (!typescriptWatchProcess.killed) typescriptWatchProcess.kill();
  process.exit(0);
};

process.on('SIGINT', exit);

await typescriptWatchProcess.exited;

console.log('TypeScript subprocess stopped unexpectedly:', typescriptWatchProcessError);

exit();
