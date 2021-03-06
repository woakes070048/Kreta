/*
 * This file is part of the Kreta package.
 *
 * (c) Beñat Espiña <benatespina@gmail.com>
 * (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ActionTypes from './../constants/ActionTypes';

const Actions = {
  removeOldNotifications: () => ({
    type: ActionTypes.NOTIFICATION_REMOVE_OLD
  }),
  removeNotification: (notification) => ({
    type: ActionTypes.NOTIFICATION_REMOVE,
    notification
  })
};

export default Actions;
