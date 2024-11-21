import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
    "https://pxfsgjxcggucietafrgf.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnNnanhjZ2d1Y2lldGFmcmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNzUwNTQsImV4cCI6MjA0NzY1MTA1NH0.SCu3yXot4eyzAtY3oH3vVzvhUH9Zw_tFzrTFyOPeBtE"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <BrowserRouter>
        <SessionContextProvider supabaseClient={supabase}>
            <App />
        </SessionContextProvider>
    </BrowserRouter>
    </React.StrictMode >
);


