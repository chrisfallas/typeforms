import esbuild from 'esbuild';
import ts from 'typescript';
import fs from 'fs';
import path from 'path';

const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));

const isProd = process.env.BUILD_TYPE?.toUpperCase?.() === 'PROD';
const dirname = new URL('.', import.meta.url).pathname;
const outdir = isProd ? 'dist' : 'local-package/dist';

const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: false,
  platform: 'node',
  format: 'esm',
  outdir,
  drop: isProd ? ['debugger'] : undefined,
  legalComments: !isProd ? 'none' : undefined,
  jsx: 'transform',
  external: ['react', 'react-dom'],
  plugins: [],
};

const typescriptOptions = {
  ...tsconfig.compilerOptions,
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  jsx: ts.JsxEmit.ReactJSX,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  moduleDetection: ts.ModuleDetectionKind.Force,
  lib: undefined,
  outDir: outdir,
};

const prepareLocalPackage = () => {
  const localPackagePath = path.join(dirname, 'local-package');
  if (fs.existsSync(localPackagePath)) {
    fs.rmSync(localPackagePath, { recursive: true, force: true });
  }
  fs.mkdirSync(localPackagePath, { recursive: true });
  fs.copyFileSync('LICENSE', path.join(localPackagePath, 'LICENSE'));
  fs.copyFileSync('package.json', path.join(localPackagePath, 'package.json'));
}

const compileTypescript = (fileNames, options) => {
  const host = ts.createCompilerHost(options);

  host.writeFile = (fileName, contents) => {
    if (!/^.*\.d\.ts$/.test(fileName)) return;
    if (fs.existsSync(fileName)) fs.rmSync(fileName);
    fs.mkdirSync(path.dirname(fileName), { recursive: true });
    fs.writeFileSync(fileName, contents);
  };

  const program = ts.createProgram(fileNames, options, host);
  const result = program.emit();
  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);

  const hasErrors = allDiagnostics.some(diagnostic => {
    return diagnostic.category === ts.DiagnosticCategory.Error;
  });

  if (hasErrors) {
    const formattedErrors = allDiagnostics
      .filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error)
      .map(diagnostic => {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        if (diagnostic.file) {
          const result = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
          const { line, character } = result;
          const fileName = diagnostic.file.fileName.replace(dirname, '');
          return `⚠️  ${fileName} (${line + 1},${character + 1}): ${message}`;
        } else {
          return message;
        }
      });

    throw new Error(formattedErrors.join('\n\n'));
  }
};

if (isProd) {
  try {
    console.time('⚡ Bundle build complete');
    console.time('☠️  Bundle build failed');
    compileTypescript(['src/index.ts'], typescriptOptions);
    await esbuild.build(buildOptions);
    console.timeEnd('⚡ Bundle build complete');
  } catch (error) {
    console.log(`${error.message}\n`);
    console.timeEnd('☠️  Bundle build failed');
  }
} else {
  prepareLocalPackage();
  buildOptions.plugins.push({
    name: 'BuildWatchLogs',
    setup(build) {
      let isSuccessfulBuild = false;
      build.onStart(() => {
        try {
          compileTypescript(['src/index.ts'], typescriptOptions);
          isSuccessfulBuild = true;
        } catch (error) {
          console.log(`${error.message}\n`);
          isSuccessfulBuild = false;
        }
      });
      build.onEnd(({ errors }) => {
        if (!errors?.length && isSuccessfulBuild) {
          console.log('⚙️  Build finished, watching for changes...\n');
        } else if (!isSuccessfulBuild) {
          console.log('☠️  Build failed, watching for changes...\n');
        }
      });
    },
  });
  const buildContext = await esbuild.context(buildOptions);
  await buildContext.watch();
}
