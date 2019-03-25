import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {

          console.log("product detail value: ", value.detailProduct);
          const { id, title, img, price, company, info, inCart} = value.detailProduct;

          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <img src={img} alt="product" className="img-fluid"/>
                </div>
                <div className="col-10 mx-auto col-md-6 my-3">
                    <h2>{title}</h2>
                    <h4 className="text-title text-capitalize text-muted mt-3 mb-2">made by {company}</h4>
                    <h4 className="text-blue"><strong>${price}</strong></h4>
                    <p className="text-muted lead">{info}</p>
                    <div>
                      <Link to="/">
                        <ButtonContainer>
                          Back to Products
                        </ButtonContainer>
                      </Link>

                      <ButtonContainer disabled={inCart ? true : false } 
                                       onClick={() => {
                                          value.addToCart(id)
                      }}>
                        
                        {inCart ? 'in Cart' : 'Add to cart'}
                      </ButtonContainer>
                    </div>
                </div>                
              </div>
            </div>
          )
          
        }}
      </ProductConsumer>
    );
  }
}

export default Details;