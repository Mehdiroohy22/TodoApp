// import Container from './layout/container';
// import { El } from './library/El';
import './styles/input.css';
import { Navbar, Container } from '@/layout';
import { FilterModal, Modal, Paganation, Table } from './components';
import { showAllData } from './script/script';

const App = () => {
  return [Container(Navbar()), Container(Table()), Container(Paganation()), Modal(), FilterModal(), showAllData()];
};

export default App;
