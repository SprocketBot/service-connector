import {
  Enum,
  DataRecord,
  BaseService,
  SendInput,
} from '@sprocketbot/service-connector';
import { z } from 'zod';
import fetch from 'node-fetch';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
}

export type HttpServiceMetadata = {
  method: HttpMethod;
};

export abstract class HttpService<
  Endpoints extends Enum,
  Schemas extends DataRecord<Endpoints, HttpServiceMetadata> = DataRecord<
    Endpoints,
    HttpServiceMetadata
  >,
> extends BaseService<Endpoints, Schemas> {
  transport = async <E extends Endpoints>(
    endpoint: E,
    data: SendInput<E>,
  ): Promise<unknown> => {
    const method = this.schemas[endpoint].method;
    const endpointUrl = new URL(`${this.baseUrl}/${endpoint}`);
    switch (method) {
      case 'get':
      default:
        for (const [key, value] of Object.entries(data)) {
          endpointUrl.searchParams.append(key, encodeURI(value.toString()));
        }
        return fetch(endpointUrl, { method: 'get' }).then((r) => r.json());
      case 'post':
        return fetch(endpointUrl, { body: JSON.stringify(data) }).then((r) =>
          r.json(),
        );
    }
  };
  constructor(_schemas: Schemas, readonly baseUrl: URL | string) {
    super(_schemas);
  }
}
