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
    data: getData, // async func to get the data
    onAdd, // (data)
    onUpdate, // (data)
    onDelete, // (data)
    enqueueSnackbar,
    selection,
    pageSize,
    options: _options,
    localization: _localization,
    ...rest
  } = props;
  const [options, setOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOptions({
      ..._options,
      pageSize,
    });
  }, []);

  useEffect(() => {
    setOptions({
      ..._options,
      pageSize,
    });
  }, [_options]);

  const __localization = {
    ...localization,
    ..._localization
  };

  const data = (query) => new Promise(async (resolve, reject) => {
    let data = await getData();

    const getPaginatedData = (_data = [], page) => {
      return _data.slice(page * pageSize, page * pageSize + pageSize)
    }
    if (query.search !== '') {
      console.log(data);
      data = data.filter((row) => {
        const anyValueMatchesTheSearch = Object.keys(row).some((_key) => String(row[_key]).toLowerCase().includes(query.search.toLowerCase()));
        console.log(`search: ${query.search} | row: ${JSON.stringify(row)} | matches: ${anyValueMatchesTheSearch}`);
        return anyValueMatchesTheSearch;
      });
      console.log('search result');
      console.log(data);
    }

    const localData = getPaginatedData(data, query.page);  // pagination
    setIsLoading(false);

    resolve({
      data: localData,
      page: query.page,
      totalCount: (data && data.length) || 0,
    });
  });

  const onError = (error) => {
    enqueueSnackbar(error);
  };

  const onRowAdd = newData => (
    new Promise(resolve => {
      setIsLoading(true);
      setTimeout(() => {
        onAdd(newData, onError);
        setIsLoading(false);
        resolve();
      }, 200);
    })
  );

  const onRowUpdate = (newData, oldData) => (
    new Promise(resolve => {
      setIsLoading(true);
      setTimeout(() => {
        onUpdate(newData, onError, oldData);
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
      localization={__localization}
      editable={{ onRowAdd, onRowUpdate, onRowDelete }}
      options={options}
      {...rest}
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
  pageSize: PropTypes.number,
};

Table.defaultProps = {
  title: '',
  data: [],
  enqueueSnackbar: () => {},
  onEdit: () => {},
  onAdd: () => {},
  onDelete: () => {},
  selection: false,
  pageSize: 10,
};

export default withSnackbar(Table);
