import { LightningElement,wire,track } from 'lwc';
import { gql, graphql } from "lightning/uiGraphQLApi";


const columns = [
  {label : "Name", fieldName : "Name" , type:'text'},
  {label : "Phone", fieldName : "Phone" , type:'phone'},
  {label : "Email", fieldName : "Email" , type:'email'},
  {label : "Account Name", fieldName : "AccountName" , type:'Text'},
  {label : "Created Date", fieldName : "CreatedDate" , type:'date'},
  
]

export default class GraphQLQuery extends LightningElement {

      @track records;
      searchValue='';
      dataList= [];
      columnsList =columns; 
      after =null;
      pageInfo;
      pageNumber=1;
      totalCount=0;
      pageSize=5;
      isLoading=false;


      get variables(){
        return {
            likeParams: '%'+this.searchValue+'%',
            limit:this.pageSize,
            after:this.after
        }
      }

      handleChange(event){
        event.preventDefault();
        this.searchValue=event.target.value;
        
      }

      connectedCallback(){
        this.isLoading=true;
      }

    @wire(graphql, {
       query: gql`
       query ContactInfo (
        $likeParams: String,
        $limit: Int,
        $after: String
       )
       {
        uiapi {
          query {
            Contact(
                first :$limit ,
                orderBy: {Name: {order :ASC}},
                where: {
                    Name: {like: $likeParams}
                },
                after: $after
            ) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  Phone{
                    value
                  }
                  CreatedDate{
                    value,
                    displayValue
                  }
                  Account{
                    Id
                    Name{
                      value
                    }
                  }
                  Email{
                    value
                  }
                  
                }
              }
              totalCount
              pageInfo{
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
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
           //this.records=data.uiapi.query.Contact.edges;
           this.pageInfo=data.uiapi.query?.Contact?.pageInfo;
           this.totalCount=data.uiapi.query?.Contact?.totalCount;
           this.dataList=data.uiapi.query?.Contact?.edges?.map((item)=>{
            console.log("items "+item);
            return {
              Id: item.node.Id,
              Name :item.node.Name.value,
              Email :item.node.Email.value,
              AccountName :item.node.Account?.Name.value,
              CreatedDate :item.node.CreatedDate.value,
              Phone :item.node.Phone.value,


            }
           });
           this.isLoading=false;
        }
        else if(error){
            console.error('error'+error);
            this.isLoading=false;
        }
      }

      get totalPage(){
        return Math.ceil(this.totalCount /this.pageSize);
      }

      get disableNextButton(){
        return !this.pageInfo?.hasNextPage;
      }
      get disableReset(){
        if (this.pageNumber==1)
        {
          return true;
        }
        else{
          return false;
        }
 
      }

        handleNext(Event) {
          Event.preventDefault();
          this.isLoading=true;
          if(this.pageInfo && this.pageInfo.hasNextPage)
          {
            this.after=this.pageInfo.endCursor;
            this.pageNumber++;
          }
          else{
            this.after=null;
            this.pageNumber=1;
          }

        }

        handleReset(Event){
          Event.preventDefault();
          this.isLoading=true;
          this.after=null;
          this.pageNumber=1;
        }

}