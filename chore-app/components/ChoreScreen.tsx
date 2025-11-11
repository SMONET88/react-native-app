
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export const ChoreScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={[
                    { key: 'Bridget' },
                    { key: 'Ellie' },
                    { key: 'Isabelle' },
                    { key: 'Kate' },
                    { key: 'Maggie' },
                    { key: 'Sam' },
                    { key: 'Sara' },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,              // fills the whole screen
        paddingTop: 200,       // optional spacing
        backgroundColor: '#ebf3f6ff',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default ChoreScreen;

