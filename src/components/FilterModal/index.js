'use strict';
import { El } from '@/library/El';
import { getReq, renderTable } from '@/script/script';
export const FilterModal = function () {
  return El({
    element: 'div',
    onclick: closeFilterModal,
    id: 'filterModal',
    className: 'bg-zinc-600 bg-opacity-60 absolute top-0 flex  items-center h-screen w-screen hidden overflow-hidden ',
    child: [
      El({
        element: 'form',
        className:
          'h-full w-80 p-2 bg-white -right-80 absolute top-0 transition ease-linear delay-75 duration-700 -translate-x-80',
        child: [
          El({
            element: 'div',
            className: 'w-full flex justify-between mb-4',
            child: [
              El({
                element: 'h1',
                className: 'font-bold',
                child: 'Filters',
              }),
              El({
                element: 'ion-icon',
                id: 'closeFilter',
                name: 'close-outline',
              }),
            ],
          }),
          El({
            element: 'div',
            className: 'flex flex-col w-full gap-2',
            child: [
              El({
                element: 'label',
                for: 'priorityFilter',
                className: '',
                child: 'Priority:',
              }),
              El({
                element: 'select',
                name: 'priority',
                id: 'priorityFilter',
                className: 'rounded outline-slate-200  border-2 border-gray-200 p-2',
                child: [
                  El({
                    element: 'option',
                    value: 'all',
                    child: 'All',
                  }),
                  El({
                    element: 'option',
                    value: 'high',
                    child: 'High',
                  }),
                  El({
                    element: 'option',
                    value: 'medium',
                    child: 'Medium',
                  }),
                  El({
                    element: 'option',
                    value: 'low',
                    child: 'Low',
                  }),
                ],
              }),
              El({
                element: 'label',
                for: 'statusFilter',
                className: '',
                child: 'Status:',
              }),
              El({
                element: 'select',
                id: 'statusFilter',
                className: 'rounded outline-slate-200 border-2 border-gray-200 p-2',
                child: [
                  El({
                    element: 'option',
                    value: 'all',
                    child: 'All',
                  }),
                  El({
                    element: 'option',
                    value: 'todo',
                    child: 'Todo',
                  }),
                  El({
                    element: 'option',
                    value: 'doing',
                    child: 'Doing',
                  }),
                  El({
                    element: 'option',
                    value: 'done',
                    child: 'Done',
                  }),
                ],
              }),
              El({
                element: 'label',
                for: 'deadlineFilter',
                value: '2010-01-01',
                className: '',
                child: 'Deadline:',
              }),
              El({
                element: 'input',
                id: 'deadlineFilter',
                type: 'date',
                className: 'rounded outline-slate-200  border-2 border-gray-200 p-2',
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const closeFilterModal = function (e) {
  e.preventDefault();
  if (e.target.id === 'filterModal' || e.target.id === 'closeFilter') {
    document.getElementById('filterModal').classList.add('hidden');
    const priorityFilterVal = document.getElementById('priorityFilter').value;
    const statusFilterVal = document.getElementById('statusFilter').value;
    const deadlineFilterVal = document.getElementById('deadlineFilter').value;
    // console.log(priorityFilterVal, statusFilterVal);
    getReq(
      `http://localhost:3000/allData?${priorityFilterVal === 'all' ? '' : 'priority'}=${priorityFilterVal}&${statusFilterVal === 'all' ? '' : 'status'
      }=${statusFilterVal}&${deadlineFilterVal === '2010-01-01' ? '' : 'deadline'}=${deadlineFilterVal}`,
    ).then((resp) => {
      renderTable(resp);
    });
  }
};
