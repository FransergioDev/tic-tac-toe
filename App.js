import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    // Linhas
    if(tabuleiro[linha][0].trim().length > 0 && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }

    // Colunas
    if(tabuleiro[0][coluna].trim().length > 0 && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    //Diagonal 1
    if(tabuleiro[0][0].trim().length > 0 && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }
    //Diagonal 2
    if(tabuleiro[0][2].trim().length > 0 &&  tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][1]) {
      return finalizarJogo(tabuleiro[0][2]);
    }

    //Nenhum ganhador
    if ((jogadasRestantes - 1) === 0) {
      setJogadasRestantes(0);
      return finalizarJogo('');
    }

    //Jogo ainda não acabou
    setJogadasRestantes((jogadasRestantes - 1));
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');
  }

  switch(tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Seleciona o primeiro jogador</Text>

        <View style={styles.inlineItems}>
          <TouchableOpacity 
            style={styles.boxJogador}
            onPress={() => iniciarJogo('X')}
          >
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.boxJogador}
            onPress={() => iniciarJogo('O')}
          >
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.txtJogadorAtual}>É a vez do jogador </Text>
        <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{jogadorAtual}</Text>
        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inlineItems}>
                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity key={numeroColuna}
                        style={styles.boxJogador}
                        disabled={coluna !== ''}
                        onPress={() => jogar(numeroLinha, numeroColuna)}
                      >
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }
        <TouchableOpacity 
          style={styles.btnMenu}
          onPress={() => setTela('menu')}
          >
            <Text style={styles.txtBtnMenu}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Resultado final</Text>
        {
          ganhador === '' && 
          <Text style={styles.ganhador}>Empate</Text>
        }
        {
          ganhador !== '' && 
          <>
            <Text style={styles.ganhador}>Ganhador</Text>
            <View 
              disabled={true}
              style={styles.boxJogador}
            >
            <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }
        <TouchableOpacity 
          style={styles.btnMenu}
          onPress={() => setTela('menu')}
          >
            <Text style={styles.txtBtnMenu}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  subtitulo: {
    fontSize: 20,
    color: '#555',
    marginTop: 20,
    marginBottom: 15
  },
  txtJogadorAtual: {
    fontSize: 20,
    color: '#3333',
  },
  boxJogador: {
    width: 80,
    height: 80,
    margin: 5,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: "#ddd"
  },  
  jogadorX: {
    fontSize: 40,
    color: '#553fda'
  },
  jogadorO: {
    fontSize: 40,
    color: '#da3f3f'
  },
  inlineItems: {
    flexDirection: 'row'
  },
  btnMenu: {
    marginTop: 20,
  },
  txtBtnMenu: {
    color: '#4e6fe4'
  },
  ganhador: {
    fontSize: 25,
    color: '#333' ,
    fontWeight: 'bold'
  }
});
