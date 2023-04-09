import { Enum, DataRecord, SendInput, SendOutput } from './types';

export abstract class BaseService<
  Endpoints extends Enum,
  Schemas extends DataRecord<Endpoints> = DataRecord<Endpoints>,
> {
  constructor(readonly schemas: Schemas) {}
  abstract transport: (
    endpoint: Endpoints,
    data: SendInput<Endpoints, Schemas>,
  ) => Promise<unknown>;

  async send<E extends Endpoints>(
    endpoint: E,
    data: unknown,
  ): Promise<SendOutput<E, Schemas>> {
    const endpointSchema = this.schemas[endpoint];

    const validatedInput = endpointSchema.input.parse(data);

    const output = await this.transport(endpoint, validatedInput);

    const validatedOutput = endpointSchema.output.parse(output);

    return validatedOutput;
  }
}
