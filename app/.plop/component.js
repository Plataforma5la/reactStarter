/* @flow */
import React from 'react'
import styles from './{{ properCase name }}.styl'

const {{ properCase name }} = ({
  name = 'Anonimo'
}: {
  name: string
}) => (
  <div>{name}</div>
);

{{ properCase name }}.displayName = '{{ properCase name }}';

export default {{ properCase name }}
