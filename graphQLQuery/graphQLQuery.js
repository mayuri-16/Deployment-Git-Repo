import { LightningElement,wire,track } from 'lwc';
import { gql, graphql } from "lightning/uiGraphQLApi";

export default class GraphQLQuery extends LightningElement {

      @track records;
      searchValue='';

      get variables(){
        return {
            likeParams: '%'+this.searchValue+'%',
            limit:5
        }
      }

      handleChange(event){
        event.preventDefault();
        this.searchValue=event.target.value;
        
      }

    @wire(graphql, {
       query: gql`
       query ContactInfo (
        $likeParams: String,
        $limit: Int
       )
       {
        uiapi {
          query {
            Contact(
                first :$limit ,
                orderBy: {Name: {order :ASC}},
                where: {
                    Name: {like: $likeParams}
                }
            ) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  Account{
                    Name{
                      value
                    }
                  }
                  Email{
                    value
                  }
                  
                }
              }
            }
          }
        }
      }
       `,
       variables:'$variables'
    })
    wiredGraphQLResult({data,error}){
        if(data){
           console.log('data ->>>'+JSON.stringify(data));
           this.records=data.uiapi.query.Contact.edges;
        }
        else if(error){
            console.error('error'+error);
        }
    }

}