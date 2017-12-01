import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {{ properCase name }} from 'Components/{{properCase folder}}/{{ properCase name }}';
import s from 'Components/{{properCase folder}}/{{ properCase name }}.styl';

storiesOf('{{ properCase name }}', module)
  .add('default', () => <{{ properCase name }}/>);
