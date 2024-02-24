import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './libraries/store.ts'
const Render = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Render />
)
