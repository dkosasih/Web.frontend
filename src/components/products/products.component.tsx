import { productActions } from 'actions';
import { ComponentAuth } from 'auth/auth';
import { Product } from 'dto/product';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import './products.component.css';

export interface  ComponentProps extends ComponentAuth {
    products?: Product[];
    loadProducts?: Function;
}

class Products extends React.Component<ComponentProps, {}> {
    constructor(props: ComponentProps) {
        super(props);
    }
    
    componentWillMount() {
        this.getData();
    }

    getData() {
        this.props.loadProducts!(this.props.auth!.getAccessToken());
    }

    renderChildren = ()=> this.props.products!.map((x,i) => {
            return i % 2 === 0 ? this.props.products!.slice(i, i+2) : null;
        }).filter(x => x != null);

    getProductItem = (item: Product) => {
        return (<div className="col-md-4 outline" key={item.id}>
            <div>
                Brand: {item.brand} <br />
                Description: {item.description} <br />
                    Model: {item.model} <br/>
            </div>
        </div>)
    }

    render() {
        if (this.props.products) {
            return (
                <div className="col-md-12">
                    {this.renderChildren().map((result, index) => {
                        return result
                            ? ([<div className="row" key={'row'+index}>
                                <div className="col-md-1" />
                                {result.map((item: Product, i: number) => i === 0
                                    ? [this.getProductItem(item), <div key={'space'+i} className="col-md-2" />]
                                    : this.getProductItem(item))
                                }
                                <div className="col-md-1" />
                            </div>,
                            <div key={'emp-row' + index} className="row">&nbsp;</div>])
                            : null;
                    })}
                </div>
            );
        } else {
            return null;
        }
    }
}

interface OwnProps extends ComponentProps{
}

const mapStateToProps = (state: RootState) => ({
    products: state.products.products
});

const mapDispatchToProps = (dispatch: Function, props: OwnProps) => ({
    loadProducts: (authToken: string) => dispatch(productActions.loadProductsAction(authToken))
});

export default connect<{}, {}, ComponentProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Products) as React.ComponentClass<OwnProps>