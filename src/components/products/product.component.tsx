import { ProductDto } from 'dto/product';
import * as React from 'react';


interface ComponentProps {
    product: ProductDto;
    authDelete: boolean;
    deleteItem: (id: string) => void;
}

export class Product extends React.PureComponent<ComponentProps> {
    handleDelete = (id: string) => {
        this.props.deleteItem(id);
    }

    render() {
        return (
            <div>
                Brand: {this.props.product.brand} <br />
                Description: {this.props.product.description} <br />
                Model: {this.props.product.model} <br/>
                {this.props.authDelete && (
                <div>
                        <button onClick={()=> this.handleDelete(this.props.product.id) }>Delete</button>
                </div>
                )}
            </div>
        );
    }
}