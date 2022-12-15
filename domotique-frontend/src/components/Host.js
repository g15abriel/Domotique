import React, {useState} from "react";
import { View, Text, StyleSheet,  Switch, Alert } from "react-native";
import axios from 'axios';

import comomStyles from "../comomStyles";

export default props => {

    //led vermelho
  const [isEnable, setIsEnable] = useState(props.done == 'false' ? false:true)

  const isSwitch = () => {
    setIsEnable(previousState => !previousState)
  }

  const ledVermelho = () => {
    if(isEnable == false){
      axios.get(`http://${props.ip}/on`).then(response =>{
        console.log('led Vermelho Ligado')
      }).catch((error) => {
        console.log('Erro! Verifique o sinal!')

        Alert.alert('ERRO: Não foi possível acender o led!')
      })
    }
    else{
      axios.get(`http://${props.ip}/off`).then(response => {
        console.log('led desligado')
      }).catch((error) => {
        console.log('Erro! Verifique o sinal!')

        Alert.alert('ERRO: Não foi possível desligar o led!')
      })
    }
  }

    return (
        <View style={styles.container}>

            <View style={styles.escopo}>

                <Text style={styles.titulo}>{props.name}</Text>
                <View style={styles.status}>
                    <Text style={isEnable ? styles.ON : styles.OFF}>{isEnable ? 'LIGADO':'DESLIGADO'}</Text>
                    <Switch style={isEnable ? styles.ONS : styles.OFFS}
                        onValueChange={isSwitch}
                        value={isEnable}
                        onChange={[ledVermelho, () => props.toggleHost(props.id)]}
                    />
                </View>

            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        borderColor: '#AAA',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    escopo:{
        width: 300
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 15,
        marginLeft: 25
      },
    detalhes: {
        fontSize: 20,
        textAlign: 'justify',
        marginTop: 25,
        color: "#696969"
      },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 25,
        marginVertical: 20
      }, 
    ON : {
        fontSize: 15,
        textAlign: 'justify',
        marginVertical: 15,
        color: '#2ecc73',
        fontWeight: 'bold'
      },
    ONS : {
        marginVertical: 10
      },
    OFF : {
        fontSize: 15,
        textAlign: 'justify',
        marginVertical: 15,
        color: '#cc4040',
        fontWeight: 'bold'
      },
    OFFS : {
        marginVertical: 10
      }
})