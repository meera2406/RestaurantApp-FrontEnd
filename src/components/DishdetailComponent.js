import React from 'react';
import { Card , CardImg ,  CardText , CardBody , CardTitle} from 'reactstrap';

    function RenderDish({dish}){
        
            if(dish != null)
            {                
                    return(     
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                            <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                            </Card>
                            </div>  
                            <div className="col-12 col-md-5 m-1">
                                <h4>Comments</h4>
                                <RenderComment commentt={dish.comments} /> 
                            </div>      
                        </div>                                                                                      
                    );               
            }
            else{
                return(
                    <div></div>
                );                
            }         
    }

    function RenderComment({commentt}){
        
        if(commentt != null){
            return  commentt.map( (com) => {
                return(                    
                        <ul key={com.id} className="list-unstyled">
                            <li>
                            <p>{com.comment}</p>                            
                            <p>--{com.author},<span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}
                            ).format(new Date(Date.parse(com.date)))}</span></p>
                            </li>                            
                        </ul>   
                );
            });         
        }      
        else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {

        return(
           <div className="container">
               <RenderDish dish={props.dish} />
           </div>                           
           
        );

    }


export default DishDetail;
