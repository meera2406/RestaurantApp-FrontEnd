import React , {Component } from 'react';
import { Card , CardImg ,  CardText , CardBody ,Breadcrumb , BreadcrumbItem , CardTitle ,
         Modal , ModalBody , Label , Button , ModalHeader , Row ,Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control , Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderDish({dish}){        
             return( <div className="col-12 col-md-5 m-1">
                            <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                            </Card>
                        </div>
                    );                              
    }

    function RenderComment({comments,addComment,dishId}){
        if(comments!= null)
        return(
            <div className="col-12 col-md-5 m-1">
                 <h4>Comments</h4>
                 <ul className="list-unstyled">
                     {comments.map((comment) => {
                         return(
                            <li key={comment.id}>
                            <p>{comment.comment}</p>                            
                            <p>--{comment.author},<span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}
                            ).format(new Date(Date.parse(comment.date)))}</span></p>
                            </li>  
                         );
                     })}
                 </ul>
                 <CommentForm dishId={dishId} addComment={addComment}/>
            </div> 
        );
        else
        return(
            <div></div>
        );
    }        
    class CommentForm extends Component{
        constructor(props) {
            super(props);
        
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
            this.state = {              
              isModalOpen : false
            };
          }   
              
          toggleModal(){
              this.setState({
                  isModalOpen : !this.state.isModalOpen
              });
          }
          handleSubmit(values) {
              this.toggleModal();
              this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }
        render() {
            return(
                <div className="row">
                <Button outline color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                 <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                 <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                         <Row className="form-group">
                             <Label md={12} htmlFor="rating">Rating</Label>
                         </Row>
                         <Row className="form-group">
                             <Col >
                             <Control.select model=".rating" name="rating" className="form-control">
                                 <option>1</option>
                                 <option>2</option>
                                 <option>3</option>
                                 <option>4</option>
                                 <option>5</option>
                             </Control.select>
                             </Col>
                         </Row>
                         <Row className="form-group">
                             <Label md={12} htmlFor="author" >Your Name</Label>
                         </Row>
                         <Row className="form-group">
                         <Col >
                             <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                             className="form-control" validators={{minLength : minLength(3),maxLength:maxLength(15)}}/>
                              <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{                                           
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                             /></Col>
                         </Row>
                         <Row >
                         <Label md={12} htmlFor="comment" >Comment</Label>
                         </Row>
                         <Row >
                         <Col >
                             <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                             className="form-control" />
                             </Col>
                         </Row>
                         <Row className="form-group"> 
                         <Col >                               
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>     
                                    </Col>                           
                        </Row>
                     </LocalForm>
                 </ModalBody>
                </Modal>
                </div>
            );
        }
    } 
        
    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
         return(
             <div className="container">
                 <div className="row">
                 <Breadcrumb>
                 <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                 <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                 </Breadcrumb>
                 <div className="col-12">
                 <h3>{props.dish.name}</h3><hr />
                </div>         
                 <RenderDish dish={props.dish} />
                 <RenderComment comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                 </div>
             </div>
         );
         else
         return(
             <div></div>
         );
    }


export default DishDetail;
