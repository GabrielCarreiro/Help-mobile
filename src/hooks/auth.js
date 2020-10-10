import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function loadData() {
      const user = await AsyncStorage.getItem('@HELP:user');
      // console.log("AuthProvider user", user);

      if(user){
        setData({ user: JSON.parse(user) })
      }
    }

    loadData();
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.get('usuarios');
    console.log("usuarios", response);

    const user = response.data.filter(data => {
      console.log("data", data.password,  data.nome, password);
      return (data.email === email && data.password === password);
    });

    console.log("user", user);

    if(user.length > 0){
      await AsyncStorage.setItem('@HELP:user', JSON.stringify(user[0]));
      setData({ user: user[0] });
    }else{
      throw new Error('Usuário ou senha inválido');
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@HELP:user');

    setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };