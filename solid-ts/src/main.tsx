import 'solid-devtools';
import '@/styles/index.scss';

/* @refresh reload */
import { render } from 'solid-js/web';
import { isEnvBrowser } from '@/lib/constants';

if (isEnvBrowser) document.body.style.backgroundColor = '#1A1A1A';

render(() => <>Hello World</>, document.body!);
