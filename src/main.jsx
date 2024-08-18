import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login';
import App from './App';
import './styles.css'

ReactDOM.render(
  <Router>
      <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/play" element={<App />} />
      </Routes>
  </Router>,
  document.getElementById('root')
);
