import React, { Component } from 'react';
import { Card , CardImg , CardImgOverlay , CardText , CardBody , CardTitle} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);

    }

    renderDish(dish){
        
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
                                {this.renderComment(dish.comments)} 
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

    renderComment(commentt){
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        if(commentt != null){
            return  commentt.map( (com) => {
                return(                    
                        <ul key={com.id} className="list-unstyled">
                            <li>
                            <p>{com.comment}</p>                            
                            <p>--{com.author},<span>{new Date(com.date).toLocaleDateString("en-US", options)}</span></p>
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

    render(){

        return(
           <div>
               {this.renderDish(this.props.selectedDish)}   
           </div>                           
           
        );

    }
}

export default DishDetail;
