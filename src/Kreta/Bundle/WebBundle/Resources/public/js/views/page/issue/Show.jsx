/*
 * This file is part of the Kreta package.
 *
 * (c) Beñat Espiña <benatespina@gmail.com>
 * (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import './../../../../scss/views/page/issue/_show';
import PriorityIcon from './../../../../svg/priority';

import React from 'react';

import Button from '../../component/Button';
import Form from '../../component/Form';
import HelpText from '../../component/HelpText';
import Icon from '../../component/Icon';
import Issue from '../../../models/Issue';
import IssueField from '../../component/IssueField';
import Selector from '../../component/Selector';
import UserImage from '../../component/UserImage';

export default React.createClass({
  propTypes: {
    issue: React.PropTypes.object.isRequired,
    project: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      issueChanged: false,
      issue: this.props.issue
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      issue: nextProps.issue,
      issueChanged: false
    });
  },
  updateInput(ev) {
    this.setState({
      issue: this.state.issue.set(ev.target.name, ev.target.value),
      issueChanged: true
    });
  },
  doTransition(id) {
    this.state.issue.doTransition(id, {
      success: (data) => {
        this.setState({issue: this.state.issue.set(data)});
      }
    });
  },
  getProjectOptions() {
    const project = App.collection.project.get(this.props.project.id);
    if (!project) {
      return {
        asignee: [],
        priority: [],
        type: []
      };
    }
    const assignee = project.get('participants').map((p) => {
        let assigneeName = `${p.user.first_name} ${p.user.last_name}`;
        if (p.user.first_name === '') {
          assigneeName = p.user.username;
        }

        return (
          <IssueField image={<UserImage user={p.user}/>}
                      key={p.user.id}
                      label="Assigned to"
                      text={assigneeName}
                      value={p.user.id}/>
        );

      }),
      priority = project.get('issue_priorities').map((p) => {
        return (
          <IssueField image={<Icon glyph={PriorityIcon}
                                   style={{width: '20px'}}/>}
                      key={p.id}
                      label="Priority"
                      text={p.name}
                      value={p.id}/>
        );
      });

    return {assignee, priority};
  },
  onIssueSaved() {
    this.setState({issueChanged: false});
  },
  render() {
    const issue = this.state.issue.toJSON(),
      options = this.getProjectOptions();
    let saveButton = <HelpText text="You can change issue details inline"/>;
    if (this.state.issueChanged) {
      saveButton = <Button color="green" type="submit">Done</Button>;
    }
    const allowedTransitions = this.state.issue.getAllowedTransitions().map((transition, index) => {
      return (
        <Button color="green"
                key={index}
                onClick={this.doTransition.bind(this, transition.id)}>
          {transition.name}
        </Button>
      );
    });
    return (
      <Form model={Issue}
            onSaveSuccess={this.onIssueSaved}>
        <input name="id" type="hidden" value={issue.id}/>
        <input name="project" type="hidden" value={this.props.project.id}/>
        <input className="issue-show__title"
               name="title"
               onChange={this.updateInput}
               value={issue.title}/>
        <section className="issue-show__transitions">
          {allowedTransitions}
        </section>
        <section className="issue-show__fields">
          <Selector disabled={true}
                    name="assignee"
                    onChange={this.selectorChanged}
                    value={issue.assignee.id}>
            {options.assignee}
          </Selector>
          <Selector disabled={true}
                    name="priority"
                    onChange={this.selectorChanged}
                    value={issue.priority.id}>
            {options.priority}
          </Selector>
        </section>
        <textarea className="issue-show__description"
                  name="description"
                  onChange={this.updateInput}
                  value={issue.description}/>

        <div className="issue-show__save">
          {saveButton}
        </div>
      </Form>
    );
  }
});
