import type {
  ArgumentValue,
  TypeOrTypeHandler,
} from "@codemonument/cliffy/command";
import type { z, ZodType, ZodTypeDef } from "zod";

/**
 * This is a factory function to create a custom cliffy type handler for validating cli-option values with zod schemas.
 *
 * @param zodSchema the zod schema to validate the param against
 * @returns A TypeOrTypeHandler for cliffy to use as a tpye for Options-definition
 *
 * Example:
 * new Command()
    .type("zodInt", zodType(z.coerce.number().int()))
    .option("--zodInt <value:zodInt>", "An integer validated by zod")
 */
export function zodType<
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(
  zodSchema: ZodType<Output, Def, Input>,
): TypeOrTypeHandler<z.infer<typeof zodSchema>> {
  // return the custom validation function for cliffy based on the zod schema input
  return ({ label, name, value }: ArgumentValue) => {
    const validationResult = zodSchema.safeParse(value);

    if (validationResult.success) {
      return validationResult.data;
    }

    // label = 'Option' | 'Argument' or other
    // name = the name of the option or argument
    throw new Error(
      `${label} "${name}" failed Zod Validation: \n${validationResult.error.message}`,
    );
  };
}
