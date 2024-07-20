import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext({}, () => { })

const CartContext = createContext({}, () => { })

const EntrepreneurProductContext = createContext({}, () => { })

const TheRequestContext = createContext({}, () => { })

export default function ContextProvider({ children }) {       // A grande função
    // PARA O CONTEXTO DO USUÁRIO
    const [user, setUser] = useState({
        uid: '',
        bairro: '',
        cidade: '',
        datanasc: '',
        email: '',
        estado: '',
        iscodigo: '',
        nome: '',
        codigo: '',
        nrcartao: '',
        rua: '',
        password: '',
        tipoConta: '',
        descricao: '',
        placa: '',
        isavailable: '',
    })

    function LocalSignIn(uid, bairro, cidade, datanasc, email, estado, iscodigo, nome, codigo, nrcartao, rua, password, tipoConta, placa, descricao, isavailable) {    //Armazena as informações do usuário logado
        if (uid !== '' || email !== '' || nome !== '' || password !== '' || codigo !== '' || iscodigo !== '') {
            setUser({
                uid: uid,
                bairro: bairro,
                cidade: cidade,
                datanasc: datanasc,
                email: email,
                estado: estado,
                iscodigo: iscodigo,
                nome: nome,
                codigo: codigo,
                nrcartao: nrcartao,
                rua: rua,
                password: password,
                tipoConta: tipoConta,
                descricao: descricao,
                placa: placa,
                isavailable: isavailable,
            })
            console.log(user)
        } else {
            console.log('algo de errado com o contexto de login')
        }
    }

    // PARA O CONTEXTO DO CARRINHO
    const [cart, setCart] = useState([])
    const [totalValue, setTotalValue] = useState()

    function SetLocalCart(item) {       // atualiza o carrinho com novos itens
        if (item === 'Limpar') {
            setCart([])
        } else if (item) {
            const existsProduct = cart.find((i) => i.productId === item.productId)
            if (existsProduct) {
                console.log('Este produto já está no carrinho')
                return 'existe'
            } else {
                const newCart = cart
                newCart.push(item)
                setCart(newCart)
                return 'novo'
            }
        } else {
            console.log('Algo de errado com o contexto do carrinho')
        }
    }

    function removeCartsItens(index) {      // remover tal item do carrinho
        let newCart = cart.filter((item, i) => i !== index)
        setCart(newCart)
        console.log(cart)
    }

    function deleteCart() {
        setCart([])
        console.log('Carrinho: ', cart)
    }

    // PARA O CONTEXTO DO PRODUTO DA VEZ QUE O EMPREENDEDOR CLICOU
    const [thisProductEnter, setThisProductEnter] = useState([])
    function setLocalProductEnter(productId, nome, imgum, preco, descricao, qtde, codempre) {
        setThisProductEnter({
            productId: productId,
            nome: nome,
            imgum: imgum,
            preco: preco,
            descricao: descricao,
            qtde: qtde,
            codempre: codempre,
        })
    }

    // PARA O CONTEXTO DO PEDIDO DA VEZ (EMPREENDEDOR E ENTREGADOR)
    const [thisRequest, setThisRequest] = useState([])
    function setLocalRequest( nomeProduto, nomeEmpre, nomeCli, nomeEnt, valorTotal, qtde, imgum, codent, isempaccept, isentaccept, idPedido, codemp, codcli, emEntrega, isfinished) {
        setThisRequest({
            nomeProduto: nomeProduto,
            nomeEmpre: nomeEmpre,
            nomeCli: nomeCli,
            nomeEnt: nomeEnt,
            valorTotal: valorTotal,
            qtde: qtde,
            imgum: imgum,
            codent: codent,
            isempaccept: isempaccept,
            isentaccept: isentaccept,
            idPedido: idPedido,
            codemp: codemp,
            codcli: codcli,
            emEntrega: emEntrega,
            isfinished: isfinished,
        })
    }

    return (
        <UserContext.Provider value={{ LocalSignIn, user }}>
            <CartContext.Provider value={{ SetLocalCart, cart, totalValue, setTotalValue, removeCartsItens, deleteCart }}>
                <EntrepreneurProductContext.Provider value={{ thisProductEnter, setLocalProductEnter }}>
                    <TheRequestContext.Provider value={{ thisRequest, setLocalRequest }}>
                        {children}
                    </TheRequestContext.Provider>
                </EntrepreneurProductContext.Provider>
            </CartContext.Provider>
        </UserContext.Provider>
    )
}
export { UserContext }
export { CartContext }
export { EntrepreneurProductContext }
export { TheRequestContext }