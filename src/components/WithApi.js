import React, { useState, useEffect } from 'react';

function WithApi() {
  // Estado para armazenar o valor selecionado
  const [selectedValue, setSelectedValue] = useState('');

  // Estado para armazenar a lista de usuários da API
  const [users, setUsers] = useState([]);

  // Estado para indicar se os dados estão sendo carregados
  const [loading, setLoading] = useState(true);

  // Função para buscar os usuários da API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data); // Atualiza o estado com os usuários
        setLoading(false); // Indica que os dados foram carregados
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setLoading(false); // Indica que ocorreu um erro
      }
    };

    fetchUsers();
  }, []);

  // Função para atualizar o estado quando o valor do select muda
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <h2>Selecione um usuário:</h2>
      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <>
          <select value={selectedValue} onChange={handleChange}>
            <option value="">Selecione um usuário...</option>
            {/* Gerando opções dinamicamente usando .map() */}
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {/* Exibindo o valor selecionado */}
          {selectedValue && (
            <p>Você selecionou: <strong>{selectedValue}</strong></p>
          )}
        </>
      )}
    </div>
  );
}

export default WithApi;