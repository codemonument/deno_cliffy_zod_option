import { startCli } from "./src/cli.ts";

// export all symbols here which should be available when the module is imported
export { zodType } from "./src/zodType.ts";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  // show demo of the zodOption cliffy extension
  await startCli();
}
