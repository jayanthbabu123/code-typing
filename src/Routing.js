import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodeDisplay from './code-display';
import CodeTyping from './code-typing';

export default function Routing() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<CodeTyping />} />
                    <Route path='step-guide' element={<CodeDisplay />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}