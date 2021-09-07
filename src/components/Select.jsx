import { func, string, arrayOf } from 'prop-types';
import React from 'react';

const Select = (props) => {
  const { labelText, id, value, change, name, options } = props;
