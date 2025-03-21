import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Componente principal
function Carrossel() {
    // Estados para armazenar a lista de produtos, carregamento e erro
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // Estados para o modal e produto selecionado
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

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

    // Configurações do carrossel
    const settings = {
        dots: true, // Mostra os pontos de navegação
        infinite: true, // Loop infinito
        speed: 500, // Velocidade da transição
        slidesToShow: 1, // Quantidade de slides visíveis
        slidesToScroll: 1, // Quantidade de slides a rolar
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
            <h1 style={styles.titulo}>Carrossel</h1>
            <div style={styles.listaProdutos}>
                {produtos.map((produto) => (
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
                        <h2 style={styles.modalTitulo}>
                            {produtoSelecionado.title}
                        </h2>

                        {/* Carrossel de imagens */}
                        <Slider {...settings}>
                        <div>
        <div style={styles.modalImagemContainer}>
            <img
                src={produtoSelecionado.image}
                alt="Frente"
                style={styles.modalImagem}
            />
        </div>
        <p style={styles.legendaImagem}>Frente</p>
    </div>
    <div>
        <div style={styles.modalImagemContainer}>
            <img
                src={produtoSelecionado.image}
                alt="Lateral"
                style={styles.modalImagem}
            />
        </div>
        <p style={styles.legendaImagem}>Lateral</p>
    </div>
    <div>
        <div style={styles.modalImagemContainer}>
            <img
                src={produtoSelecionado.image}
                alt="Costas"
                style={styles.modalImagem}
            />
        </div>
        <p style={styles.legendaImagem}>Costas</p>
    </div>
                        </Slider>

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
        cursor: "pointer",
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
        maxHeight: "100%",
        objectFit: "contain",
        marginBottom: "10px",
    },
    legendaImagem: {
        textAlign: "center",
        fontSize: "14px",
        color: "#666",
    },
    modalTitulo: {
        fontSize: "24px",
        marginBottom: "10px",
    },
    modalDescricao: {
        fontSize: "16px",
        marginTop: "40px"
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
    modalImagemContainer: {
        display: "flex",
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Centraliza verticalmente
        height: "200px", // Altura fixa para o contêiner do carrossel
        overflow: "hidden", // Evita que a imagem ultrapasse o contêiner
    },
   

};

export default Carrossel;