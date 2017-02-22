/*
 * This file is part of the Kreta package.
 *
 * (c) Beñat Espiña <benatespina@gmail.com>
 * (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import Form from './../component/Form';
import FormActions from './../component/FormActions';
import FormInput from './../component/FormInput';
import FormInputWysiwyg from './../component/FormInputWysiwyg';
import Button from './../component/Button';
import Selector from './../component/Selector';
import Thumbnail from './../component/Thumbnail';
import SelectorOption from './../component/SelectorOption';
import {Row, RowColumn} from './../component/Grid';

const validate = (values) => {
  const
    errors = {},
    requiredFields = ['title', 'project', 'assignee', 'priority'];

  requiredFields.forEach(field => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

@connect(state => ({
  initialValues: {
    project: state.currentProject.project.id
  },
  members: state.currentProject.project.organization.owners.concat(
    state.currentProject.project.organization.organization_members
  )
}))

@reduxForm({form: 'TaskNew', validate})
class TaskNew extends React.Component {
  getAssignees() {
    const els = [(
      <SelectorOption
        key={0}
        text="Unassigned"
        thumbnail={<Thumbnail image={null} text=""/>}
        value=""
      />
    )];

    this.props.members.forEach((member) => {
      els.push(<SelectorOption
        key={member.id}
        text={member.id}
        thumbnail={<Thumbnail image={null} text={member.id}/>}
        value={member.id}
      />);
    });

    return els;
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <RowColumn>
            <Field component="hidden" name="project"/>
            <Field autoFocus component={FormInput} label="Title" name="title" tabIndex={1}/>
            <div className="task-new__description">
              <Field component={FormInputWysiwyg} label="Description" name="description" tabIndex={2}/>
            </div>
          </RowColumn>
        </Row>
        <Row collapse>
          <RowColumn large={4} medium={6}>
            <Field component={Selector} name="assignee" tabIndex={3}>
              {this.getAssignees()}
            </Field>
          </RowColumn>
          <RowColumn large={4} medium={6}>
            <Field component={Selector} name="priority" tabIndex={4}>
              <SelectorOption text="Select one..." value=""/>
              <SelectorOption text="High" value="1"/>
              <SelectorOption text="Medium" value="1"/>
              <SelectorOption text="Low" value="1"/>
            </Field>
          </RowColumn>
        </Row>
        <Row>
          <RowColumn>
            <FormActions>
              <Button color="green" tabIndex={5} type="submit">Done</Button>
            </FormActions>
          </RowColumn>
        </Row>
      </Form>
    );
  }
}

export default TaskNew;
