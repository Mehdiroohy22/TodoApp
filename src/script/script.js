import { El } from '@/library/El';
// import { data } from '@/assets/data';
import { statusVariants, Button, namingPagination } from '@/components';
// import { doc } from 'prettier';
// import { get } from 'lodash';

export const renderTable = (arr) => {
  const tbodyInnerHtml = document.querySelector('tbody');
  if (tbodyInnerHtml) {
    tbodyInnerHtml.remove();
  }

  const tbodyDataArr = Array.from(
    arr.map((obj) => {
      return El({
        element: 'tr',
        id: obj.id,
        className: '',
        child: [...tdMaker(obj)],
      });
    }),
  );

  const tbody = El({
    element: 'tbody',
    child: [...tbodyDataArr],
  });
  const rawTable = document.querySelector('table');
  rawTable.append(tbody);
  // document.querySelector('tbody').append(tbody);
};
const tdMaker = (obj) => {
  const arryOfTd = [];
  for (const key in obj) {
    if (key !== 'id' && key !== 'detail') {
      arryOfTd.push(
        El({
          element: 'td',
          className: 'py-2 text-center border',
          child: tdStyle(key, obj[key]),
        }),
      );
    }
  }
  const actionTd = El({
    element: 'div',
    className: 'flex justify-center items-center',
    child: [
      Button({
        element: 'button',
        child: El({
          element: 'ion-icon',
          name: 'trash',
          onclick: deleteItem,
        }),
        variant: 'delete',
      }),
      Button({
        element: 'button',
        child: El({
          element: 'ion-icon',
          name: 'pencil',
          onclick: editItem,
        }),
        variant: 'edit',
      }),
      Button({
        element: 'button',
        child: El({
          element: 'ion-icon',
          name: 'eye',
        }),
        variant: 'view',
        onclick: viewAllData,
      }),
    ],
  });
  arryOfTd.push(
    El({
      element: 'td',
      className: 'py-2 text-center border',
      child: actionTd,
    }),
  );

  return arryOfTd;
};

const tdStyle = (key, val) => {
  if (key === 'priority' || key === 'status') {
    return El({
      element: 'div',
      child: val,
      className: statusVariants[val],
    });
  } else {
    return val;
  }
};

export const postReq = async (newObj) => {
  const rawResponse = await fetch('http://localhost:3000/allData', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObj),
  });
  const content = await rawResponse.json();
  return content;
};

export const getReq = async (url) => {
  const response = await fetch(url, {});
  const json = await response.json();
  return json;
};

export const deleteReq = async (id) => {
  const response = await fetch(`http://localhost:3000/allData/${id}`, {
    method: 'DELETE',
  });
  const content = await response.json();
  return content;
};

export const editReq = async (id, newObj) => {
  const response = await fetch(`http://localhost:3000/allData/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObj),
  });
  const content = await response.json();
  return content;
};

window.addEventListener('load', () => {
  getReq('http://localhost:3000/allData').then((res) => {
    namingPagination(res.length);
    renderTable(res);
  });
});

const deleteItem = (e) => {
  const itemId = e.target.closest('tr').id;
  deleteReq(itemId).then((res) => getReq('http://localhost:3000/allData').then((res) => renderTable(res)));
};

const editItem = (e) => {
  const itemId = e.target.closest('tr').id;
  getReq(`http://localhost:3000/allData/${itemId}`).then((res) => putEditedDataInModal(res));
  document.getElementById('Modal').classList.remove('hidden');
  document.getElementById('saveBtn').innerHTML = 'EDIT';
  document.getElementById('saveBtn').dataset.id = itemId;
  e.preventDefault();
};

// putEditedDataInModal
const putEditedDataInModal = (obj) => {
  console.log(obj);
  document.getElementById('taskName').value = obj.task;
  document.getElementById('priority').value = obj.priority;
  document.getElementById('status').value = obj.status;
  document.getElementById('deadline').value = obj.deadline;
  document.getElementById('detail').value = obj.detail;
};

const viewAllData = (e) => {
  const itemId = e.target.closest('tr').id;
  getReq(`http://localhost:3000/allData/${itemId}`).then((res) => {
    document.getElementById('viewData').classList.remove('hidden');
    showAllData(res);
    putDataInview(res);
  });

  e.preventDefault();
};
const def = {
  task: 'a',
  status: 'a',
  priority: 'a',
  deadline: 'a',
  detail: 'a',
};
export function showAllData(obj = def) {
  return El({
    element: 'div',
    id: 'viewData',
    onclick: closeViewData,
    className: 'bg-zinc-600 bg-opacity-60 h-screen w-screen absolute top-0 flex justify-center items-center hidden',
    child: [
      El({
        element: 'div',
        id: 'viewInner',
        className: 'bg-white rounded w-3/6 flex flex-col px-6 py-6',
        child: [
          El({
            element: 'div',
            className: 'w-full h-12 rounded p-2 flex gap-1 items-center',
            child: [
              El({
                element: 'h1',
                className: 'text-slate-500 w-24 h-full text-center p-1',
                child: 'Task Name:',
              }),
              El({
                element: 'h1',
                className: 'border rounded font-bold text slate-600 flex-1 h-full p-1 px-3',
                id: 'taskView',
                child: `${obj.task}`,
              }),
            ],
          }),
          El({
            element: 'div',
            className: 'w-full h-12 rounded p-2 flex gap-1 items-center',
            child: [
              El({
                element: 'h1',
                className: 'text-slate-500 w-24 h-full text-center p-1',
                child: 'Priority:',
              }),
              El({
                element: 'h1',
                className: 'border rounded font-bold text slate-600 flex-1 h-full p-1 px-3',
                child: `${obj.priority}`,
                id: 'priorityView',
              }),
            ],
          }),
          El({
            element: 'div',
            className: 'w-full h-12 rounded p-2 flex gap-1 items-center',
            child: [
              El({
                element: 'h1',
                className: 'text-slate-500 w-24 h-full text-center p-1',
                child: 'Status:',
              }),
              El({
                element: 'h1',
                className: 'border rounded font-bold text slate-600 flex-1 h-full p-1 px-3',
                child: `${obj.status}`,
                id: 'statusView',
              }),
            ],
          }),
          El({
            element: 'div',
            className: 'w-full h-12 rounded p-2 flex gap-1 items-center',
            child: [
              El({
                element: 'h1',
                className: 'text-slate-500 w-24 h-full text-center p-1',
                child: 'Deadline:',
              }),
              El({
                element: 'h1',
                className: 'border rounded font-bold text slate-600 flex-1 h-full p-1 px-3',
                child: `${obj.deadline}`,
                id: 'deadlineView',
              }),
            ],
          }),
          El({
            element: 'div',
            className: 'w-full h-24 rounded p-2 flex gap-1 items-center',
            child: [
              El({
                element: 'h1',
                className: 'text-slate-500 w-24 h-full text-center p-1',
                child: 'Detail:',
              }),
              El({
                element: 'h1',
                className: 'border rounded font-bold text slate-600 flex-1 h-full p-1 px-3',
                child: `${obj.detail}`,
                id: 'detailView',
              }),
            ],
          }),
          El({
            element: 'button',
            id: 'close',
            className: 'bg-indigo-600 text-slate-100 p-2 m-2 mt-4',
            child: 'close',
          }),
        ],
      }),
    ],
  });
}
const closeViewData = function (e) {
  e.preventDefault();
  if (e.target.id === 'viewData' || e.target.id === 'close') {
    document.getElementById('viewData').classList.add('hidden');
  }
};

window.addEventListener('load', () => {
  document.getElementById('loading').classList.add('hidden');
});

function putDataInview(obj) {
  document.getElementById('taskView').innerHTML = obj.task;
  document.getElementById('statusView').innerHTML = obj.status;
  document.getElementById('priorityView').innerHTML = obj.priority;
  document.getElementById('deadlineView').innerHTML = obj.deadline;
  document.getElementById('detailView').innerHTML = obj.detail;
}
