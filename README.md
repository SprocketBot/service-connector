# Service Connector

> [Zod](https://github.com/colinhacks/zod) powered, generic service connector that can be used with any transport layer.

This package aims to provide a transport-agnostic way of glueing services together; it exposes an abstract class `BaseService<Endpoints, Schemas>`, which needs to have a `transport` member implemented.

Included is an example (but incomplete) of an HTTP Service Implementation.

## Examples

### Simple Usage
```typescript
// Some service exposes some endpoints
enum MyServiceEndpoints {
    FOO = "foo"
    BAR = "bar"
}

// Those endpoints have inputs and outputs
const MyServiceSchemas = {
    /**
     * think of this as foo({someString}) => {someOtherString}
     */
    [MyServiceEndpoints.FOO]: {
        input: z.object({ someString: z.string() }),
        output: z.object({ someOtherString: z.string() })
    },
    /**
     * think of this as bar({someString}) => {someOtherString}
     */
    [MyServiceEndpoints.BAR]: {
        input: z.object({ someString: z.string() }),
        output: z.object({ someOtherString: z.string() })        
    }
}

// Now we can define our service

class MyService extends BaseService<MyServiceEndpoints, typeof MyServiceSchemas> {
    constructor() { super(MyServiceSchemas) }

    transport = <E extends Endpoints>(endpoint: E, data: SendInput<E>):Promise<unknown> => {
        // This can perform whatever logic you would like
        return Promise.resolve({ someOtherString: data.someString })
    }
}

// Now we can instantiate and use the service
const myService = new MyService();
myService.send(MyServiceEndpoints.FOO, { someString: "Hello World!" })
         .then(console.log) // -> { someOtherString: "Hello World!" }

```



