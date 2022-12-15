import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Alert } from 'react-native';

import comomStyles from '../comomStyles';
import backImage from '../../assets/imgs/back.jpg';

import Host from '../components/Host';
import AddHost from './AddHost';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/FontAwesome';

export default class HostList extends Component {
    state = {
        showAddHost: true,
        hosts: [{
            id: Math.random(),
            name: 'Televisão',
            ip: '123.456.789',
            ifON: '0xE46F',
            ifOFF: '0x8A9B',
            done: 'false'
        },{
            id: Math.random(),
            name: 'Ar Condicionado',
            ip: '129.876.2.4',
            ifON: '0x4790',
            ifOFF: '0xAB87',
            done: 'true'
        },]
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
                <TouchableOpacity style={styles.addButton}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddHost: true })}>
                    <Icon name='plus' size={20}
                        color={comomStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

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
    }
})