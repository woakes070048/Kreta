/*
 * This file is part of the Kreta package.
 *
 * (c) Beñat Espiña <benatespina@gmail.com>
 * (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import './../../../scss/views/page/task/_show';

import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router';

import {routes} from './../../../Routes';

import Button from './../../component/Button';
import FormActions from './../../component/FormActions';
import LoadingSpinner from './../../component/LoadingSpinner';
import {Row, RowColumn} from './../../component/Grid';
import CardExtended from './../../component/CardExtended';
import UserThumbnail from './../../component/UserThumbnail';

@connect(state => ({task: state.currentProject.selectedTask}))
class Show extends React.Component {
  username(user) {
    return !user.first_name ? `@${user.user_name}` : `${user.first_name} ${user.last_name}`;
  }

  render() {
    const {task, params} = this.props;

    if (!task) {
      return (
        <div className="task-show">
          <LoadingSpinner/>
        </div>
      );
    }

    return (
      <div>
        <Row>
          <RowColumn>
            <h1 className="task-show__title">{task.title}</h1>
            <p className="task-show__description">{task.description}</p>
          </RowColumn>
        </Row>
        <Row className="task-show__fields">
          <RowColumn small={6}>
            <CardExtended subtitle="Assignee"
                          thumbnail={<UserThumbnail user={task.assignee}/>}
                          title={this.username(task.assignee)}/>
          </RowColumn>
          <RowColumn small={6}>
            <CardExtended subtitle="Creator"
                          thumbnail={<UserThumbnail user={task.creator}/>}
                          title={this.username(task.creator)}/>
          </RowColumn>
        </Row>
        <Row className="task-show__fields">
          <RowColumn small={6}>
            <CardExtended subtitle="Progress"
                          title={task.progress}/>
          </RowColumn>
          <RowColumn small={6}>
            <CardExtended subtitle="Priority"
                          title={task.priority}/>
          </RowColumn>
        </Row>
        <Row>
          <RowColumn>
            <FormActions>
              <Link to={routes.task.edit(params.organization, params.project, params.task)}>
                <Button color="green">Edit</Button>
              </Link>
            </FormActions>
          </RowColumn>
        </Row>
      </div>
    );
  }
}

export default Show;
