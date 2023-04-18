import { El } from '@/library/El';

export const Table = () => {
    return El({
        element: 'table',
        className: ' w-full table-fixed border-collapse border border-slate-300 ',
        child: [
            El({
                element: 'thead',
                className: '',
                child: [
                    El({
                        element: 'tr',
                        className: '',
                        child: [
                            El({
                                element: 'th',
                                child: 'Task Name',
                                className: 'w-1/5 text-center py-2 px-2 border',
                            }),
                            El({
                                element: 'th',
                                child: 'Priority',
                                className: 'w-1/5 text-center py-2 border',
                            }),
                            El({
                                element: 'th',
                                child: 'Status',
                                className: 'w-1/5 py-2 text-center border',
                            }),
                            El({
                                element: 'th',
                                child: 'Deadline',
                                className: 'w-1/5 py-2 text-center border',
                            }),
                            El({
                                element: 'th',
                                child: 'Actions',
                                className: 'w-1/5 py-2 border',
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
