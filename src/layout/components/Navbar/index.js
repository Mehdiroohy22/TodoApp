import { El } from '@/library/El';
import _ from 'lodash';
// import { FilterModal, namingPagination } from '@/components';
// import { Modal } from '@/components/Modal/Modal';
import { getReq, renderTable } from '@/script/script';

export const Navbar = () => {
    return El({
        element: 'nav',
        className: 'bg-indigo-600 p-2 text-slate-200 flex justify-between items-center',
        child: [
            El({
                element: 'div',
                className: 'flex items-center gap-2',
                child: [
                    El({
                        element: 'button',
                        className: 'flex',
                        onclick: list,
                        child: El({
                            element: 'ion-icon',
                            name: 'list-outline',
                            className: 'text-3xl',
                        }),
                    }),
                    El({
                        element: 'h1',
                        child: 'My To-Do Tasks',
                    }),
                ],
            }),
            El({
                element: 'div',
                className: 'flex gap-3 items-center',
                child: [
                    El({
                        element: 'div',
                        className: 'relative',
                        child: [
                            El({
                                element: 'ion-icon',
                                name: 'search-outline',
                                className: 'absolute top-1.5 left-1',
                            }),
                            El({
                                element: 'input',
                                type: 'search',
                                placeholder: 'search',
                                id: 'search',
                                onkeyup: searchFunc,
                                className: 'p-1 pl-8 rounded bg-purple-700 text-sm font-thin outline-none',
                            }),
                        ],
                    }),
                    El({
                        element: 'ion-icon',
                        name: 'funnel',
                        className: 'text-xl cursor-pointer',
                        onclick: sort,
                    }),
                    El({
                        element: 'ion-icon',
                        name: 'add-circle',
                        className: 'text-2xl cursor-pointer',
                        onclick: addTodo,
                    }),
                ],
            }),
        ],
    });
};

const list = function (e) {
    console.log('list');
};
const sort = function (e) {
    document.getElementById('filterModal').classList.remove('hidden');
    document.getElementById('filterForm').classList.add('');
};
const addTodo = function () {
    document.getElementById('Modal').classList.remove('hidden');
    document.getElementById('saveBtn').innerHTML = 'SAVE';
};

const getReqDebounce = _.debounce((e) => {
    const searchInputValue = document.querySelector('#search').value;
    // console.log(searchInputValue);
    if (searchInputValue) {
        getReq(`http://localhost:3000/allData?q=${searchInputValue}`).then((res) => {
            // namingPagination(res.length);
            renderTable(res);
        });
    }
}, 500);
const searchFunc = (e) => {
    getReqDebounce(e);
};
