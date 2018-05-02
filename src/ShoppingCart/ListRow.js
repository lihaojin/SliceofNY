import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';

class ListRow extends Component {
    constructor(props){
      super(props);
      this.state = {
        recipe: this.props.recipe
      }
    }
    render() {
      return(
        <ListItem>
          {this.props.recipe.name}
        </ListItem>
      )
    }
}
export default ListRow;
