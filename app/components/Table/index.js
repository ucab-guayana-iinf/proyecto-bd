import React, { useState, forwardRef } from 'react';
import MaterialTable, { Column } from 'material-table';
import PropTypes from 'prop-types';
import tableIcons from './icons';
import localization from './localization';

const Table = (props) => {
  const {
    title,
    headers,
    data,
    onAdd,
    onEdit,
    onDelete,
  } = props;

  return (
    <MaterialTable
      title={title}
      columns={headers}
      data={data}
      icons={tableIcons}
      localization={localization}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                const updatedData = { ...prevState, data };
                onAdd(updatedData);
                return updatedData;
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  const updatedData = { ...prevState, data };
                  onUpdate(updatedData);
                  return updatedData;
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                const updatedData = { ...prevState, data };
                onDelete(updatedData);
                return updatedData;
              });
            }, 600);
          }),
      }}
    />
  );
}

Table.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.any.isRequired,
  data: PropTypes.any,
  onEdit: PropTypes.any,
  onAdd: PropTypes.any,
  onDelete: PropTypes.any,
};

Table.defaultProps = {
  title: '',
  data: [],
  onEdit: () => {},
  onAdd: () => {},
  onDelete: () => {},
};

export default Table;
