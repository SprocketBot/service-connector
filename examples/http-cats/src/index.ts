import { HttpMethod, HttpService } from '@sprocketbot/http-connector';
import { z } from 'zod';

const CatApiUrl = 'https://meowfacts.herokuapp.com';
enum CatApiEndpoints {
  FACT = '',
}
const CatApiSchemas = {
  [CatApiEndpoints.FACT]: {
    input: z.object({}).default({}),
    output: z.object({ data: z.array(z.string()) }),
    method: HttpMethod.GET,
  },
};

class CatService extends HttpService<CatApiEndpoints, typeof CatApiSchemas> {
  constructor() {
    super(CatApiSchemas, CatApiUrl);
  }
}

const cats = new CatService();
cats.send(CatApiEndpoints.FACT, undefined).then(console.log);
cats.send(CatApiEndpoints.FACT, { number: 4 }).catch(console.log);
