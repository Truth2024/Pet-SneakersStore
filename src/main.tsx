import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context.tsx';
import './styles/main.scss'
import 'macro-css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppProvider>
			<Router>
				<App />
			</Router>
		</AppProvider>

	</StrictMode>,
)
