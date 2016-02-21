import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

class Rating extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    };
  }
  
  getValue() {
    return this.state.rating;
  }
  
  setTemp(rating) {
    this.setState({tmpRating: rating});
  }

  setRating(rating) {
    this.setState({
      tmpRating: rating,
      rating: rating,
    });
  }

  reset() {
    this.setTemp(this.state.rating);
  }

  componentWillReceiveProps(nextProps) {
    this.setRating(nextProps.defaultValue);
  }
 
  render() {
    const stars = [];
    for (let i = 1; i <= this.props.max; i++) {
      stars.push(
        <span 
          className={i <= this.state.tmpRating ? 'RatingOn' : null}
          key={i}
          onClick={!this.props.readonly && this.setRating.bind(this, i)}
          onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}
        >
          &#9734;
        </span>);
    }
    return (
      <div 
        className={classNames({
          'Rating': true,
          'RatingReadonly': this.props.readonly,
        })}
        onMouseOut={this.reset.bind(this)}
      >
        {stars}
        {this.props.readonly || !this.props.id
          ? null 
          : <input 
              type="hidden" 
              id={this.props.id} 
              value={this.state.rating} />
        }
      </div>
    );
  }  
}

Rating.propTypes = {
  defaultValue: PropTypes.number,
  readonly: PropTypes.bool,
  max: PropTypes.number,
};

Rating.defaultProps = {
  defaultValue: 0,
  max: 5,
};

export default Rating
