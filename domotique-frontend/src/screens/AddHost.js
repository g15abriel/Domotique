import React, {Component} from 'react';
import {TouchableOpacity, TextInput, Modal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import comomStyles from '../comomStyles';

const initialState = {  name: '',
                        ip: '',
                        ifON: '',
                        ifOFF: '',
                        done: 'false'}

export default class AddHost extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newHost = {
            name: this.state.name,
            ip: this.state.ip,
            ifON: this.state.ifON,
            ifOFF: this.state.ifOFF,
            done: this.state.done
        }

        if (this.props.onSave) {
            this.props.onSave(newHost)
        }

        this.setState({...initialState})
    }

    render(){
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                        <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Novo Dispositivo</Text>
                    <TextInput style={styles.input} 
                        placeholder="Nome do Dispositivo"
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}/>
                    <TextInput style={styles.input} 
                        placeholder="Número de ip"
                        onChangeText={ip => this.setState({ip})}
                        value={this.state.ip}/>
                    <TextInput style={styles.input} 
                        placeholder="Infravermelho Ligar"
                        onChangeText={ifON => this.setState({ifON})}
                        value={this.state.ifON}/>
                    <TextInput style={styles.input} 
                        placeholder="Infravermelho Desligar"
                        onChangeText={ifOFF => this.setState({ifOFF})}
                        value={this.state.ifOFF}/>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                        <View style={styles.background2}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    background2: {
        flex: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: '#B13B44',
        color: comomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#B13B44'
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        paddingHorizontal: 10
    }
})