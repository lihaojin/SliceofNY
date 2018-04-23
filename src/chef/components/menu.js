import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const MenuCard = (props) => (
  <Card>
    <CardHeader
      title={props.title}
      subtitle={props.price}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <FlatButton label="Delete" />
      <FlatButton label="Change Price" />
    </CardActions>
    <CardText expandable={true}>
      {props.description}
    </CardText>
  </Card>
);

export default MenuCard;