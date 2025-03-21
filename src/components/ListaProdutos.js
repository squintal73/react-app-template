import React, { useState, useEffect } from "react";

// Componente principal
function ListaProdutos() {
    // Estados para armazenar a lista de produtos, carregamento e erro
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

 // Estado para controlar o produto selecionado e a visibilidade do modal
 const [produtoSelecionado, setProdutoSelecionado] = useState(null);
 const [modalAberto, setModalAberto] = useState(false);


    // Estados para paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const produtosPorPagina = 9; // Quantidade de produtos por página

    // Função assíncrona para buscar produtos da API
    const buscarProdutos = () => {
        return new Promise((resolve, reject) => {
            fetch("https://fakestoreapi.com/products") // API de produtos de teste
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao carregar os produtos.");
                    }
                    return response.json();
                })
                .then((data) => {
                    resolve(data); // Resolve a Promise com os dados
                })
                .catch((error) => {
                    reject(error); // Rejeita a Promise em caso de erro
                });
        });
    };

    // useEffect para buscar os produtos quando o componente for montado
    useEffect(() => {
        buscarProdutos()
            .then((data) => {
                setProdutos(data); // Atualiza o estado com os produtos
                setCarregando(false); // Indica que os dados foram carregados
            })
            .catch((error) => {
                setErro(error.message); // Atualiza o estado com a mensagem de erro
                setCarregando(false); // Indica que a requisição terminou (mesmo com erro)
            });
    }, []);

    // Lógica para calcular os produtos da página atual
    const indiceUltimoProduto = paginaAtual * produtosPorPagina;
    const indicePrimeiroProduto = indiceUltimoProduto - produtosPorPagina;
    const produtosPaginaAtual = produtos.slice(
        indicePrimeiroProduto,
        indiceUltimoProduto
    );

    // Função para abrir o modal com os detalhes do produto
    const abrirModal = (produto) => {
        setProdutoSelecionado(produto);
        setModalAberto(true);
    };

    // Função para fechar o modal
    const fecharModal = () => {
        setModalAberto(false);
        setProdutoSelecionado(null);
    };

    // Função para mudar de página
    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    // Exibe uma mensagem de carregamento enquanto os dados são buscados
    if (carregando) {
        return <p>Carregando produtos...</p>;
    }

    // Exibe uma mensagem de erro se a requisição falhar
    if (erro) {
        return <p style={{ color: "red" }}>{erro}</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>Lista de Produtos</h1>
            <div style={styles.listaProdutos}>
                {produtosPaginaAtual.map((produto) => (
                    <div 
                    key={produto.id} 
                    style={styles.card}
                    onClick={() => abrirModal(produto)} // Abre o modal ao clicar no card
                    >
                        <img
                            src={produto.image}
                            alt={produto.title}
                            style={styles.imagem}
                        />
                        <h3 style={styles.nome}>{produto.title}</h3>
                        <p style={styles.preco}>R$ {produto.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Modal de detalhes do produto */}
            {modalAberto && produtoSelecionado && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <button style={styles.botaoFechar} onClick={fecharModal}>
                            &times;
                        </button>
                        <img
                            src={produtoSelecionado.image}
                            alt={produtoSelecionado.title}
                            style={styles.modalImagem}
                        />
                        <h2 style={styles.modalTitulo}>
                            {produtoSelecionado.title}
                        </h2>
                        <p style={styles.modalDescricao}>
                            {produtoSelecionado.description}
                        </p>
                        <p style={styles.modalPreco}>
                            Preço: R$ {produtoSelecionado.price.toFixed(2)}
                        </p>
                        <p style={styles.modalCategoria}>
                            Categoria: {produtoSelecionado.category}
                        </p>
                    </div>
                </div>
            )}

            {/* Paginação */}
            <div style={styles.paginacao}>
                <button
                    onClick={() => mudarPagina(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                    style={styles.botaoPagina}
                >
                    Anterior
                </button>
                {Array.from(
                    { length: Math.ceil(produtos.length / produtosPorPagina) },
                    (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => mudarPagina(index + 1)}
                            style={{
                                ...styles.botaoPagina,
                                ...(paginaAtual === index + 1 && styles.botaoAtivo),
                            }}
                        >
                            {index + 1}
                        </button>
                    )
                )}
                <button
                    onClick={() => mudarPagina(paginaAtual + 1)}
                    disabled={
                        paginaAtual === Math.ceil(produtos.length / produtosPorPagina)
                    }
                    style={styles.botaoPagina}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

// Estilos
const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    titulo: {
        textAlign: "center",
        marginBottom: "20px",
    },
    listaProdutos: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        backgroundColor: "#fff",
    },
    imagem: {
        maxWidth: "100%",
        height: "200px",
        objectFit: "contain",
        marginBottom: "10px",
    },
    nome: {
        fontSize: "18px",
        margin: "10px 0",
    },
    preco: {
        fontSize: "16px",
        color: "#007bff",
        fontWeight: "bold",
    },
    paginacao: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        gap: "10px",
    },
    botaoPagina: {
        padding: "10px 15px",
        border: "1px solid #007bff",
        borderRadius: "5px",
        backgroundColor: "#fff",
        color: "#007bff",
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
    },
    botaoAtivo: {
        backgroundColor: "#007bff",
        color: "#fff",
    },

    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "500px",
        width: "100%",
        position: "relative",
    },
    botaoFechar: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
    },
    modalImagem: {
        maxWidth: "100%",
        height: "200px",
        objectFit: "contain",
        marginBottom: "10px",
    },
    modalTitulo: {
        fontSize: "24px",
        marginBottom: "10px",
    },
    modalDescricao: {
        fontSize: "16px",
        marginBottom: "10px",
    },
    modalPreco: {
        fontSize: "18px",
        color: "#007bff",
        fontWeight: "bold",
    },
    modalCategoria: {
        fontSize: "16px",
        fontStyle: "italic",
    },

};

export default ListaProdutos;