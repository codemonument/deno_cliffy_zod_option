# Cliffy Extension: zodType

This package provides a cliffy cli framework extension to validate an input option for the cli with zod.

## Usage Examples

```typescript
const command = new Command()
	.name('cliffy-zod-option-demo')
	//1. register the custom cliffy types with the zodType function
	.type('zodString', zodType(z.string()))
	.type('zodInt', zodType(z.coerce.number().int()))
	.type('zodBaseColor', zodType(z.enum(['red', 'green', 'blue'])))
	// 2. Use the custom types in the options
	.option('--zodString <value1:zodString>', 'A string validated by zod')
	.option('--zodInt <value2:zodInt>', 'An integer validated by zod')
	.option(
		'--zodBaseColor <baseColor:zodBaseColor>',
		'A base color value validated by zod enum (red, green or blue)'
	)
	.option('--requiredZodInt <value3:zodInt>', 'A required integer validated by zod', {
		required: true,
	})
	.allowEmpty()
	.action(options => {
		if (Object.keys(options).length === 0) {
			command.showHelp();
			return;
		}

		// 3. Options are already validated by zod
		console.log('CLI called with options:', options);

		// Note: due to the type design of cliffy, the options always contain the 'undefined' type for each option key, parallel to the type returned by zod.
		// This can be fixed by a simple if (!options.option) check or by using the zod schema again which was used for the option in the first place.
	});

await command.parse(args);
```

## Release new version (for maintainers)

1. Update the version in the `deno.json` file.
2. Update the version in the `src/cli.ts` file.
3.
