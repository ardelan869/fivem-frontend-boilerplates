import ReactDOM from 'react-dom/client';
import { isEnvBrowser } from './lib/constants';
// Styles
import './styles/index.scss';

if (isEnvBrowser) document.body.style.backgroundColor = '#1A1A1A';

ReactDOM.createRoot(document.body!).render(<>Hello World</>);
