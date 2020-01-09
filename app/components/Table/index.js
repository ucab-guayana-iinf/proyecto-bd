import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable, { Column } from 'material-table';
import PropTypes from 'prop-types';
import tableIcons from './icons';
import localization from './localization';

const Table = (props) => {
  const {
    title,
    headers,
    data: initialData,
    onAdd, // (index, data)
    onUpdate, // (index, data)
    onDelete, // (index, data)
    refreshData,
    selection,
  } = props;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const onRowAdd = newData => (
    new Promise(resolve => {
      setTimeout(() => {
        const updatedData = [...data];
        updatedData.push(newData);
        onAdd(newData, data.indexOf(newData));
        refreshData();
        resolve();
      }, 200);
    })
  );

  const onRowUpdate = (newData, oldData) => (
    new Promise(resolve => {
      setTimeout(() => {
        const index = data.indexOf(oldData);
        data[index] = newData;
        onUpdate(newData, data.indexOf(newData))
        refreshData();
        resolve();
      }, 200);
    })
  );

  const onRowDelete = oldData => (
    new Promise(resolve => {
      setTimeout(() => {
        const index = data.indexOf(oldData);
        data.splice(index, 1);
        onDelete(oldData, index);
        refreshData();
        resolve();
      }, 200);
    })
  );

  return (
    <MaterialTable
      title={title}
      data={data}
      columns={headers}
      icons={tableIcons}
      localization={localization}
      editable={{ onRowAdd, onRowUpdate, onRowDelete }}
      options={{selection}}
      actions={
        selection
        && [{
            tooltip: 'Remove All Selected Users',
            icon: tableIcons.Delete,
            onClick: (evt, oldData) => oldData.forEach((item) => onRowDelete(item))
          }
      ]}
    />
  );
}

Table.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.any.isRequired,
  data: PropTypes.any,
  onEdit: PropTypes.any,
  onAdd: PropTypes.any,
  onDelete: PropTypes.any,
  selection: PropTypes.bool,
};

Table.defaultProps = {
  title: '',
  data: [],
  onEdit: () => {},
  onAdd: () => {},
  onDelete: () => {},
  selection: false,
};

export default Table;
