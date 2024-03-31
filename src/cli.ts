import { Command } from "@codemonument/cliffy/command";

import { z } from "zod";
import { zodType } from "./zodType.ts";

export async function startCli(args: string[] = Deno.args) {
  const command = new Command()
    .name("cliffy-zod-option-demo")
    .version("1.0.0")
    .description(
      "A package providing an extension for the cliffy cli framework to use zod for option validation",
    )
    // Examples for using zodType() with cliffy
    .type("zodString", zodType(z.string()))
    .type("zodInt", zodType(z.coerce.number().int()))
    .type("zodBaseColor", zodType(z.enum(["red", "green", "blue"])))
    .option("--zodString <value1:zodString>", "A string validated by zod")
    .option("--zodInt <value2:zodInt>", "An integer validated by zod")
    .option(
      "--zodBaseColor <baseColor:zodBaseColor>",
      "A base color value validated by zod enum (red, green or blue)",
    )
    .option(
      "--requiredZodInt <value3:zodInt>",
      "A required integer validated by zod",
      { required: true },
    )
    .allowEmpty()
    .action((options) => {
      if (Object.keys(options).length === 0) {
        command.showHelp();
        return;
      }

      console.log("CLI called with options:", options);
    });

  await command.parse(args);
}
