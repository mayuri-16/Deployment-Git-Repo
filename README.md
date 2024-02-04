GraphQL :
     GraphQL is query language for API and provides runtime to execute the queries on the existing data that are available on your database it could be salesforce or outside of Salesforce platform.
     GraphQL is basically to give you the ability to query the records inside LWC itself wothout writing even a single line ot Apex code.
     
  Syntax to write GraphQL in LWC:
    import { LightningElement, wire } from "lwc";
    import { gql, graphql } from "lightning/uiGraphQLApi";
    export default class MyGQLQuery extends LightningElement {
      @wire(graphql, {
        query: gql`
          query AccountInfo {
            uiapi {
              query {
                Account(where: { Name: { like: "Account1" } }) {
                  edges {
                    node {
                      Name {
                        value
                        displayValue
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      })
      propertyOrFunction;
    }


    Example of GraphQL code is present in Repo:
            ![Example of GraphLQ](https://github.com/mayuri-16/Deployment-Git-Repo/assets/73846347/cebcdde2-b9cb-4377-9946-35fe808d315b)

    
 How to use it:
   1. Validate your query:
        Use Altair (with Salesforce APIs) tools to validate your query. These clients allow you to quickly iterate on your query and ensure that it retrieves exactly the information your component needs.
   2. Import the adapter:
       Import the Salesforce GraphQL Wire Adapter (graphql) and tagged template function (gql) into your LWC’s code.
      gql identifies the GraphQL queries within your component source code so that the framework can handle them correctly.
      graphql is the wire adapter used to retrieve the results of your GraphQL query.
  3. Invoke your query:
      Use the imported graphql wire adapter to evaluate the GraphQL query and get the data you need.
      Data is automatically retrieved and emitted back to your component. Data can be re-emitted to your component if LDS observes changes to previous results.

     
The benefits of the GraphQL Wire Adapter:
  1. Native queryability for LWCs:
      Query Salesforce data using industry-standard query language with rich predicates. 
      Developers can now easily and efficiently query Salesforce data in their LWCs, without needing to use Apex to handle data queries.
  2. A single endpoint and data aggregation:
      You get one endpoint for all your resources, and data can be aggregated across multiple resources.
      Fewer, more specific requests help you optimize the performance of your app.
  3. Better developer experience:
      GraphQL enables a better developer experience with rich expressions, a comprehensive view of data, and extensible experiences.
  4. Modular, distributed data fetching logic:
      GraphQL fragments allow a clean separation of application and presentation logic.
      Components that fetch data and components that render data can be written and tested independently, with no overlap in responsibilities.
      This also makes the components more reusable.
  5. Built-in shared caching by LDS:
      GraphQL data is strongly-typed and described by a formal schema.
      LDS leverages this deep understanding of the data to cache it more effectively and efficiently and to provide consistency guarantees that span both GraphQL and non-GraphQL results.
      LDS can, for example, combine and reuse data from previous GraphQL and non-GraphQL wire adapter requests to satisfy subsequent requests without requesting data from the server, which improves app performance beyond the gains from GraphQL’s data aggregation.
  6. User permissions and security:
      Just like with REST, when running a query, GraphQL respects Field-Level Security, Org Perms, and User CRUD permissions.
  7. Mobile offline support:
      In mobile offline-enabled environments, GraphQL queries can be evaluated against locally-cached data, which allows components to use GraphQL queries offline.
      This capability is important for our customers who operate mission-critical functions in low or no connectivity conditions such as rural areas, underground, and disaster sites.
      Offline queries reflect draft changes (record creations and updates) that haven’t yet been replicated to the server.
      These runtime environments also support the use of GraphQL queries to prime the local data cache in preparation for offline mode.

 
