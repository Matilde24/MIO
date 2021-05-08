
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';


const NuevoCliente = ({ navigation, route }) => {
    
    const { guardarConsultarAPI } = route.params;

    //Campos Formularios
    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);


    // Detectar si estamos editando o no

    useEffect(() => {
        if(route.params.cliente) {
         const { nombre, telefono, correo, empresa } = route.params.cliente;

         guardarNombre(nombre);
         guardarTelefono(telefono);
         guardarCorreo(correo);
         guardarEmpresa(empresa);
        }
    }, []);

    //Almacena el cliente en la BD
    const guardarCliente = async () => {
        //Validar
        if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
            guardarAlerta(true)
            return;
        }


        //generar el cliente
        const cliente = { nombre, telefono, correo, empresa };
        console.log(cliente);


        //Si estamos editando o creando un nuevo cliente
        if(route.params.cliente) {
            const { id } = route.params.cliente;
            cliente.id = id;
            const url = `http:// 192.168.43.38:3000/clientes/${id}`;
                
            try {
                await axios.put(url, cliente);
                    
            } catch (error) {
                console.log(error);
            }
        } 
        else
        {
            console.log("agregando");
            //Guardar el cliente en la  
                try {
                    await axios.post('http:// 192.168.43.38:3000/clientes', cliente);
                } catch (error) {
                    console.log(error);
                }
        }
        console.log("saliendo");

        //Redireccionar
        navigation.navigate('Inicio');

        //Limpiar el Form
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        //Cambiar a true para traernos el nuevo Cliente
        guardarConsultarAPI(true);
    }

    return (
        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

            <TextInput
                label="Nombre"
                placeholder="Maty"
                onChangeText={texto => guardarNombre(texto)}
                value={nombre}
                style={styles.input}
            />


            <TextInput
                label="Teléfono"
                placeholder="84155301"
                onChangeText={texto => guardarTelefono(texto)}
                value={telefono}
                style={styles.input}
            />

            <TextInput
                label="Correo"
                placeholder="correo@correo.com"
                onChangeText={texto => guardarCorreo(texto)}
                value={correo}
                style={styles.input}
            />

            <TextInput
                label="Empresa"
                placeholder="Nombre Empresa"
                onChangeText={texto => guardarEmpresa(texto)}
                value={empresa}
                style={styles.input}
            />

            <Button icon="pencil-circle" mode="contained" onPress={() => guardarCliente()}>
                Guardar Cliente
            </Button>
            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={() => guardarAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => guardarAlerta(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})
export default NuevoCliente;