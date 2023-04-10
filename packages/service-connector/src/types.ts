import type { z } from 'zod';

export type Enum<T extends string = string> = {
  [P in keyof T]: T extends Record<P, infer U> ? U : never;
};
export type DataRecord<T extends Enum, Value extends object = object> = Record<
  T,
  SendDefaultValue & Value
>;
export type SendDefaultValue = {
  input:
    | z.AnyZodObject
    | z.ZodDefault<z.AnyZodObject>
    | z.ZodDefault<z.ZodUndefined>;
  output: z.ZodTypeAny;
};
export type SendOutput<
  Endpoints extends Enum,
  Schemas extends DataRecord<Endpoints> = DataRecord<Endpoints>,
> = z.infer<Schemas[Endpoints]['output']>;
export type SendInput<
  Endpoints extends Enum,
  Schemas extends DataRecord<Endpoints> = DataRecord<Endpoints>,
> = z.infer<Schemas[Endpoints]['input']>;
