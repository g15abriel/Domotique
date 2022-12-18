import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Alert, Button } from 'react-native';

import comomStyles from '../comomStyles';
import backImage from '../../assets/imgs/back.jpg';

import Host from '../components/Host';
import AddHost from './AddHost';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/FontAwesome';

export default class HostList extends Component {
    state = {
        showAddHost: false,
        hosts: [{
            id: Math.random(),
            name: 'Televisão',
            ip: '172.20.10.2',
            ifON: '0x8',
            ifOFF: '0x3D',
            done: 'false'
        },{
            id: Math.random(),
            name: 'Esp',
            ip: '192.168.20.63',
            ifON: '0x8',
            ifOFF: '0x3D',
            done: 'false'
        }]
    }

    toggleHost = hostID => {
        const hosts = [...this.state.hosts]
        hosts.forEach(host => {
            if(host.id === hostID){
                host.done = host.done === 'false' ? 'true' : 'false';
            }
        })

        this.setState({ hosts })
    }

    addHost = (newHost) => {
        if (!newHost.name.trim() || !newHost.ip.trim()){
            Alert.alert('Dados Incompletos','Preencha os dados');
            return
        }

        const hosts = [...this.state.hosts]
        hosts.push({
            id: Math.random(),
            name: newHost.name,
            ip: newHost.ip,
            ifON: newHost.ifON,
            ifOFF: newHost.ifOFF,
            done: newHost.done
        })

        this.setState({ hosts, showAddHost: false})
    }

    changeAddHost = () => {
        this.setState({showAddHost: true})
    }

    

    render(){
        return (
            <View style={styles.container}>
                <AddHost isVisible={this.state.showAddHost} 
                    onCancel={() => this.setState({showAddHost: false})} 
                    onSave={this.addHost}/>
                <ImageBackground source={backImage}
                    style={styles.background}>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Dispositivos</Text>
                        </View>
                </ImageBackground>
                <View style={styles.hostList}>
                    <FlatList data={this.state.hosts}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Host {...item} toggleHost={this.toggleHost}/>} />
                </View>
                <View style={styles.addButton}>
                <Button 
                    onPress={this.changeAddHost} title="+"
                    color="#FFF"/>
                </View>
                
            </View>
        )
    }
}

//<Icon name='plus' size={20} color={comomStyles.colors.secondary}/>

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    hostList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 50,
        color: comomStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#120A8F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 40
    }
})