import './App.scss';
import { observer } from 'mobx-react-lite';
import OWindowContent from './components/WindowContent/WindowContent';
import OWindowTabBar from './components/WindowTabBar/WindowTabBar';
import WindowTitle from './components/WindowTitle/WindowTitle';
import WindowLayout from './layouts/WindowLayout/WindowLayout';
import RootStore from './stores/RootStore';

const rootStore: RootStore = new RootStore();
export default observer(() => (
  <WindowLayout
    title={(
      <WindowTitle tabBar={<OWindowTabBar rootStore={rootStore} />} />
    )}
    content={<OWindowContent rootStore={rootStore} />}
  />
));
