import React, { Component } from 'react';
import Auth from '../../module/Auth';
import { Segment, Header, Table, Icon, Menu } from 'semantic-ui-react';
import Moment from 'moment';
import { Link } from 'react-router-dom';


import _ from 'lodash';

class Users extends Component {
  constructor(props) {
    super(props);
    let protocol =  process.env.REACT_APP_SERVER_PROTOCOL;
    let domain = protocol + '://' + process.env.REACT_APP_SERVER_HOST;
    let server = domain + ':'+ process.env.REACT_APP_SERVER_PORT+'/';
    this.state = {
      server: server,
      login: server + 'login',
      register: server + 'register',
      users: server + 'users',
      column: null,
      data: null,
      direction: null,
      authenticated: false,
      profile: false,
    };
    this.handleSort = this.handleSort.bind(this);
    this.listUsers = this.listUsers.bind(this);
  }
  async listUsers() {
    await fetch(this.state.users, {
      method: 'get',
      headers: {'Access-Control-Allow-Origin': '*', credentials: 'same-origin', 'Content-Type':'application/json'}
    })
    .then(response => {
      if (response && !response.ok) { throw new Error(response.statusText);}
      return response.json();
    })
    .then(data => {
        if(data) {
          this.setState({data: data});
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      //console.log(error)
    });
  }

  async componentDidMount() {
    // check if user is logged in on refresh
    try {
      await this.toggleAuthenticateStatus();
      await this.listUsers();

    } catch(e) {
      console.log(e.message);
    }

  }
  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return
    }
    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }
  tableRowClickFunc(user) {
    return this.props.history.push('/users/'+user.id);
  }
  render() {
    const { id, name, email, active, column, data, direction } = this.state;
    Moment.locale('en');

    return (
      <Segment>
        <Header as='h5' icon floated='right'>
          <Link to="/users/0">
            <Icon name='add user' />
            Add user
          </Link>
        </Header>
        <Table sortable celled fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'id' ? direction : null}
                onClick={this.handleSort('id')}
              >
                Id
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'email' ? direction : null}
                onClick={this.handleSort('email')}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'createdAt' ? direction : null}
                onClick={this.handleSort('createdAt')}
              >
                Created
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'updatedAt' ? direction : null}
                onClick={this.handleSort('updatedAt')}
              >
                Updated
              </Table.HeaderCell>
              <Table.HeaderCell>
                Active
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, name, email, createdAt, updatedAt, active }) => (
              <Table.Row key={id} onClick={() => this.tableRowClickFunc({id})}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{Moment(createdAt).format('LLL')}</Table.Cell>
                <Table.Cell>{Moment(updatedAt).format('LLL')}</Table.Cell>
                <Table.Cell>{active ? ( <Icon  name='check' /> ) : ( <Icon  name='close' /> ) }</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
           <Table.Row>
             <Table.HeaderCell colSpan='6'>
               <Menu floated='right' pagination>
                 <Menu.Item as='a' icon>
                   <Icon name='chevron left' />
                 </Menu.Item>
                 <Menu.Item as='a'>1</Menu.Item>
                 <Menu.Item as='a'>2</Menu.Item>
                 <Menu.Item as='a'>3</Menu.Item>
                 <Menu.Item as='a'>4</Menu.Item>
                 <Menu.Item as='a' icon>
                   <Icon name='chevron right' />
                 </Menu.Item>
               </Menu>
             </Table.HeaderCell>
           </Table.Row>
         </Table.Footer>
        </Table>
      </Segment>
    );

  }
}
export default Users;
