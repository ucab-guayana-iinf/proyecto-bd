import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable, { Column } from 'material-table';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import tableIcons from './icons';
import localization from './localization';

const Table = (props) => {
  const {
    title,
    headers,
    data: getData,
    onAdd, // (index, data)
    onUpdate, // (index, data)
    onDelete, // (index, data)
    enqueueSnackbar,
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  const data = (query) => new Promise(async (resolve, reject) => {
    const data = await getData();
    setIsLoading(false);
    resolve({
      data,
      page: query.page,
      totalCount: data.length,
    });
  });

  const onError = ({ message }) => {
    enqueueSnackbar(error);
  };

  const onRowAdd = newData => (
    new Promise(resolve => {
      setIsLoading(true);

      setTimeout(() => {
        onAdd(newData, onError);
        // refreshData();
        setIsLoading(false);
        resolve();
      }, 200);
    })
  );

  const onRowUpdate = (newData, oldData) => (
    new Promise(resolve => {
      setIsLoading(true);
      setTimeout(() => {
        onUpdate(newData, onError);
        // refreshData();
        setIsLoading(false);
        resolve();
      }, 200);
    })
  );

  const onRowDelete = oldData => (
    new Promise(resolve => {
      setIsLoading(true);
      setTimeout(() => {
        onDelete(oldData, onError);
        // refreshData();
        setIsLoading(false);
        resolve(data);
      }, 200);
    })
  );

  return (
    <MaterialTable
      data={data}
      title={title}
      columns={headers}
      icons={tableIcons}
      isLoading={isLoading}
      localization={localization}
      editable={{ onRowAdd, onRowUpdate, onRowDelete }}
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
  enqueueSnackbar: PropTypes.any,
};

Table.defaultProps = {
  title: '',
  data: [],
  enqueueSnackbar: () => {},
  onEdit: () => {},
  onAdd: () => {},
  onDelete: () => {},
};

export default withSnackbar(Table);
