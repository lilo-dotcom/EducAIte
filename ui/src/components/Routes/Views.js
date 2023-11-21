import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "../Auth/AccountContext";
import PrivateRoutes from './PrivateRoutes';
import Home from '../Pages/Home/Home';
import Register from '../Pages/User/Register/Register';
import Login from '../Pages/User/Login/Login';
import NewConversation from '../Pages/Conversation/NewConversation';

const Views = () => {
  const { user } = useContext(AccountContext);
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/new-conversation" element={<NewConversation />} />
      </Route>
      <Route path="*" element={<Login />}/>
    </Routes>
  );
};

export default Views;