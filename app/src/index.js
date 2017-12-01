import { render } from 'react-dom';
import React from 'react';

import Prueba from 'Components/Prueba';

const Root = () => (
  <Prueba />
);

render(<Root />, document.getElementById('app'));
