import { TextInput, Text, View, StyleSheet } from "react-native";

export default function Input({ label, placeholder, type = "default", editable = true, lines = 1, value = "", onChangeText, hideText = false }){
    return (
        <View style={styles.container} >
            <Text style={styles.label} >{label}</Text>
            <TextInput 
                placeholder={placeholder}
                keyboardType={type}
                editable = {editable}
                style={ lines > 1? styles.textArea : styles.control }
                placeholderTextColor="#999"
                multiline={ lines > 1? true : false }
                numberOfLines= {lines}
                textAlignVertical="top"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={hideText}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "auto", 
        paddingHorizontal: 5,
        paddingBottom: 5,
        marginBottom: 5,
    },
    label:{
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5
    },
    control:{
        width: "100%",
        fontSize: 16,
        height: 45,
        borderColor: "#999",
        borderStyle: "solid",
        borderWidth: 1,
        padding: 10
    },
    textArea:{
        width: "100%",
        fontSize: 16,
        height: 120,
        borderColor: "#999",
        borderStyle: "solid",
        borderWidth: 1,
        padding: 10,
        justifyContent: "flex-start"
    }
});