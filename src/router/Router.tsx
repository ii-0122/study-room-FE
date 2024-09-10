import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { MainContentArea, RouterStyle } from './Router.style';

export default function Router() {
  return (
    <RouterStyle>
      <Sidebar />
      <MainContentArea>
        <Header />
        <div>컨텐츠 영역</div>
      </MainContentArea>
    </RouterStyle>
  );
}
