import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    // if name is same
    if (sortColumn.path === path) {
      // change state asc or desc
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      // else path not same
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  column: PropTypes.arrayOf(
    PropTypes.objectOf({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  sortColumn: PropTypes.shape({
    path: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired
  }).isRequired,
  onSort: PropTypes.func.isRequired
};

export default TableHeader;
