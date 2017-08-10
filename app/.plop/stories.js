import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { specs, describe, it } from 'storybook-addon-specifications';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

import {{ properCase name }} from 'Components/{{properCase folder}}/{{ properCase name }}';
import s from 'Components/{{properCase folder}}/{{ properCase name }}.styl';

chai.use(chaiEnzyme());
const expect = chai.expect;

storiesOf('{{ properCase name }}', module)
  .add('default', () => {
    const story = (<{{ properCase name }}/>);
    specs(() => describe('default', () => {
      const wrapper = shallow(story);
      it('should appear', () => {
        expect(wrapper).to.be.present();
      });
    }));
    return story;
  })
