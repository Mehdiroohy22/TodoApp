'use strict';
import { El } from '@/library/El';
import { getReq, renderTable } from '@/script/script';

export const Paganation = function () {
  return El({
    element: 'div',
    className: 'flex justify-end gap-3 w-full items-center px-4 mt-4',
    child: [
      El({
        element: 'h1',
        child: 'Rows per page:',
      }),
      El({
        element: 'select',
        name: 'rowPerPage',
        id: 'rowPerPage',
        onchange: perPagefunc,
        child: [
          El({
            element: 'option',
            value: 'all',
            child: 'All',
          }),
          El({
            element: 'option',
            value: '3',
            child: '3',
          }),
          El({
            element: 'option',
            value: '5',
            child: '5',
          }),
          El({
            element: 'option',
            value: '8',
            child: '8',
          }),
        ],
      }),
      El({
        element: 'h2',
        id: 'pageNumber',
        child: '1',
        className: 'ml-6',
      }),
      El({
        element: 'h2',
        child: 'of',
        className: '',
      }),
      El({
        element: 'h2',
        child: '1',
        id: 'allPageNumber',
        className: 'mr-6',
      }),
      El({
        element: 'ion-icon',
        name: 'chevron-back-outline',
        onclick: backPage,
        className: 'cursor-pointer',
      }),
      El({
        element: 'ion-icon',
        name: 'chevron-forward-outline',
        onclick: forwardPage,
        className: 'cursor-pointer',
      }),
    ],
  });
};

const perPagefunc = function (e) {
  const valSelectPage = e.target.value;
  if (valSelectPage === 'all') {
    getReq('http://localhost:3000/allData').then((resp) => {
      document.getElementById('allPageNumber').innerHTML = '1';
      namingPagination(resp.length);
    });
  } else {
    getReq(`http://localhost:3000/allData?_page=1&_limit=${valSelectPage}`).then((resp) => {
      namingPagination(resp.length);
      console.log(resp.length);
      renderTable(resp);
    });
  }
};
const forwardPage = function () {
  const valSelectPage = document.getElementById('rowPerPage').value;
  if (valSelectPage === 'all') {
  } else {
    const pageNum = +document.getElementById('pageNumber').innerText;
    const allPageNumberInner = +document.getElementById('allPageNumber').innerText;
    if (pageNum < allPageNumberInner) {
      getReq(`http://localhost:3000/allData?_page=${pageNum + 1}&_limit=${valSelectPage}`).then((resp) => {
        renderTable(resp);
      });
      document.getElementById('pageNumber').innerHTML = pageNum + 1;
    }
  }
};

const backPage = function () {
  const valSelectPage = +document.getElementById('rowPerPage').value;
  if (valSelectPage === 'all') {
  } else {
    const pageNum = +document.getElementById('pageNumber').innerText;
    // const allPageNumberInner = +document.getElementById('allPageNumber').innerText;
    if (pageNum > 1) {
      getReq(`http://localhost:3000/allData?_page=${pageNum - 1}&_limit=${valSelectPage}`).then((resp) => {
        renderTable(resp);
      });
      document.getElementById('pageNumber').innerHTML = pageNum - 1;
    }
  }
};

export const namingPagination = () => {
  let len;
  getReq('http://localhost:3000/allData').then((res) => {
    len = res.length;
    const rowPerPage = document.getElementById('rowPerPage').value;
    if (rowPerPage === 'all') {
      document.getElementById('allPageNumber').innerHTML = '1';
    } else {
      console.log('else');
      const newAllPageNum = Math.ceil(len / Number(rowPerPage));
      console.log(Number(rowPerPage));
      document.getElementById('allPageNumber').innerHTML = newAllPageNum;
    }
  });
  console.log(len);
};
