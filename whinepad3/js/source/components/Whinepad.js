/* @flow */

import Button from './Button';
import CRUDActions from '../flux-imm/CRUDActions';
import CRUDStore from '../flux-imm/CRUDStore';
import Dialog from './Dialog';
import Excel from './Excel';
import Form from './Form';
import React, {Component} from 'react';

type State = {
  addnew: boolean,
  count: number,
};

class Whinepad extends Component {
  
  state: State;
  
  constructor() {
    super();
    this.state = {
      addnew: false,
      count: CRUDStore.getCount(),
    };
    
    CRUDStore.addListener('change', () => {
      this.setState({
        count: CRUDStore.getCount(),
      })
    });
  }
  
  shouldComponentUpdate(newProps: Object, newState: State): boolean {
    return newState.addnew !== this.state.addnew || newState.count !== this.state.count;
  }
  
  _addNewDialog() {
    this.setState({addnew: true});
  }
  
  _addNew(action: string) {
    this.setState({addnew: false});
    if (action === 'confirm') {
      CRUDActions.create(this.refs.form.getData());
    }
  }
    
  render() {
    return (
      <div className="Whinepad">
        <div className="WhinepadToolbar">
          <div className="WhinepadToolbarAdd">
            <Button 
              onClick={this._addNewDialog.bind(this)}
              className="WhinepadToolbarAddButton">
              + add
            </Button>
          </div>
          <div className="WhinepadToolbarSearch">
            <input 
              placeholder={this.state.count === 1
                ? 'Search 1 record...'
                : `Search ${this.state.count} records...`
              } 
              onChange={CRUDActions.search.bind(CRUDActions)}
              onFocus={CRUDActions.startSearching.bind(CRUDActions)} />
          </div>
        </div>
        <div className="WhinepadDatagrid">
          <Excel />
        </div>
        {this.state.addnew
          ? <Dialog 
              modal={true}
              header="Add new item"
              confirmLabel="Add"
              onAction={this._addNew.bind(this)}
            >
              <Form ref="form" />
            </Dialog>
          : null}
      </div>
    );
  }
}

export default Whinepad
