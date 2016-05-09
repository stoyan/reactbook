/* @flow */

import Button from './Button';
import React, {Component} from 'react';

type Props = {
  header: string,
  confirmLabel: string,
  modal: boolean,
  onAction: Function,
  hasCancel: ?boolean,
  children?: Array<any>,
};

class Dialog extends Component {

  props: Props;
  
  static defaultProps = {
    confirmLabel: 'ok',
    modal: false,
    onAction: (_) => {},
    hasCancel: true,
  };
  
  componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
  }
  
  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }
  
  render() {
    return (
      <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}>
        <div className={this.props.modal ? 'DialogModalWrap' : null}>
          <div className="DialogHeader">{this.props.header}</div>
          <div className="DialogBody">{this.props.children}</div>
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <span 
                  className="DialogDismiss"
                  onClick={this.props.onAction.bind(this, 'dismiss')}>
                  Cancel
                </span>
              : null
            }
            <Button onClick={this.props.onAction.bind(this, 
                this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog
