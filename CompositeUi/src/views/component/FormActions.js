/*
 * This file is part of the Kreta package.
 *
 * (c) Beñat Espiña <benatespina@gmail.com>
 * (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import './../../scss/components/_form-actions';

import React from 'react';

const FormActions = props => (
  <div className={`form-actions${props.expand ? ' form-actions--expand' : ''}`}>
    {props.children}
  </div>
);

export default FormActions;

