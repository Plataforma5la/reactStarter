/* @flow */
import React from 'react'
import styles from './Prueba.styl'

const Prueba = ({
  name = 'Anonimo'
}: {
  name: string
}) => (
  <div>{name}</div>
);

Prueba.displayName = 'Prueba';

export default Prueba
