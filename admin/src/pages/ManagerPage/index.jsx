import React from 'react';

import Approval from '../../components/Managers/Approval';
import ListManager from '../../components/Managers/ListManager';

export default function ManagerPage(props) {
  return props.mode === 'approval' ? <Approval /> : <ListManager />;
}
