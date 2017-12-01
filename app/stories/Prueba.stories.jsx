import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Prueba from 'Components/Prueba';
import s from 'Components/Prueba.styl';

storiesOf('Prueba', module)
  .add('default', () => <Prueba/>);
