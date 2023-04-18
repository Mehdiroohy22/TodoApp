import { El } from '@/library/El';
import { editReq, getReq, postReq, renderTable } from '@/script/script';

export const Modal = () => {
  return El({
    element: 'div',
    id: 'Modal',
    onclick: closeModal,
    className: 'bg-zinc-600 bg-opacity-60 h-screen w-screen absolute top-0 flex justify-center items-center hidden',
    child: [
      El({
        element: 'form',
        id: 'ModalForm',
        className: 'bg-white rounded w-3/6',
        child: [
          El({
            element: 'h1',
            className: 'font-bold py-2 px-3',
            child: 'New Task',
          }),
          El({
            element: 'hr',
            className: 'py-2',
          }),
          El({
            element: 'div',
            className: 'px-3',
            child: [
              El({
                element: 'input',
                required: 'true',
                id: 'taskName',
                type: 'text',
                placeholder: 'Task Name',
                className: 'w-full rounded outline-slate-200 border-2 border-gray-200 p-2 mb-14',
              }),
              El({
                element: 'div',
                className: 'flex justify-between gap-2 py-2 mb-12',
                child: [
                  El({
                    element: 'select',
                    name: 'priority',
                    id: 'priority',
                    className: 'rounded outline-slate-200 w-1/3 border-2 border-gray-200 p-2',
                    child: [
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
                    element: 'select',
                    id: 'status',
                    className: 'rounded outline-slate-200 w-1/3 border-2 border-gray-200 p-2',
                    child: [
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
                    element: 'input',
                    id: 'deadline',
                    type: 'date',
                    className: 'rounded outline-slate-200 w-1/3  border-2 border-gray-200 p-2',
                  }),
                ],
              }),
              El({
                element: 'textarea',
                className: 'rounded w-full outline-slate-200  border-2 border-gray-200 mb-4',
                id: 'detail',
                name: 'detail',
              }),
            ],
          }),
          El({
            element: 'hr',
            className: 'py-2',
          }),
          El({
            element: 'div',
            className: 'flex justify-between px-3 mb-3',
            child: [
              El({
                element: 'button',
                child: 'CANCEL',
                id: 'cancel',
                className: 'rounded px-2 py-1 border border-blue-600 bg-white text-blue-600 text-s font-bold',
              }),
              El({
                element: 'button',
                child: 'SAVE',
                className: 'rounded px-2 py-1 border bg-blue-600 text-white text-s font-bold',
                onclick: addData,
                id: 'saveBtn',
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const closeModal = function (e) {
  e.preventDefault();
  if (e.target.id === 'Modal' || e.target.id === 'cancel') {
    document.getElementById('Modal').classList.add('hidden');
  }
};
const addData = function (e) {
  e.preventDefault();
  if (e.target.innerText == 'SAVE') {
    const task = document.getElementById('taskName').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
    const deadline = document.getElementById('deadline').value;
    const detail = document.getElementById('detail').value;
    const idMaker = new Date();
    const newTask = {
      id: idMaker.getTime(),
      task,
      priority,
      status,
      deadline,
      detail,
    };
    clearInputs();

    postReq(newTask).then((res) => {
      if (res) {
        getReq('http://localhost:3000/allData').then((resp) => {
          console.log(resp);
          renderTable(resp);
        });
      }
    });
  } else {
    const task = document.getElementById('taskName').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
    const deadline = document.getElementById('deadline').value;
    const detail = document.getElementById('detail').value;
    const itemId = document.getElementById('saveBtn').dataset.id;
    const newEditedTask = {
      task,
      priority,
      status,
      deadline,
      detail,
    };
    editReq(itemId, newEditedTask).then((res) =>
      getReq('http://localhost:3000/allData').then((res) => {
        clearInputs();
        document.getElementById('Modal').classList.add('hidden');
        renderTable(res);
      }),
    );
  }
};

function clearInputs() {
  document.getElementById('taskName').value = '';
  document.getElementById('priority').value = 'high';
  document.getElementById('status').value = 'todo';
  document.getElementById('deadline').value = '';
  document.getElementById('detail').value = '';
}
